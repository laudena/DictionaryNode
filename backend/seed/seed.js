
require("../models/Word");
require("../models/User");
const fs = require('fs');
const mongoose = require("mongoose");
let WordModel = require('mongoose').model('Word');
let UserModel = require('mongoose').model('User');

const DICTIONARY_RAW_DATA_FILENAME = './seed/milon.html';
const DICTIONARY_USERS_FILENAME = './seed/users.json';
const WORD_SEED_NAME = "מילה";
const TITLE_ENGLISH = "";
const SUB_TITLE_ENGLISH1 = "";
const SUB_TITLE_ENGLISH2 = "";
const IMAGE = "/placeholder.jpg";


let splitText = '<div class="headerContainer">';
let flatTextPreText = '<div class="headerContainer"><div class="an-1">';
let flatTextPostText = '<sub>';
let seedDataArray ='';
let deletingInProgress = false;

function recreateUsers() {
    deletingInProgress = true;
    deleteAllUsers();
    while (deletingInProgress);

    fs.readFile(DICTIONARY_USERS_FILENAME, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('read users file');

        let users = JSON.parse(data);
        for (let counter = 0; counter < users.length; counter++) {
            (function (i) {
                console.log(users[i].username);
                UserModel.create({
                    username : users[i].username,
                    email : users[i].email,
                    salt : users[i].salt,
                    hash : users[i].hash,
                    createdAt : users[i].createdAt,
                    updatedAt: users[i].updatedAt,
                    role : users[i].role
                });
                return;
            })(counter);
        }
    });

}

function recreateWords() {
    fs.readFile(DICTIONARY_RAW_DATA_FILENAME, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        seedRawData = data.toString();
        seedRawData = seedRawData.replaceAll('\n','');
        seedDataArray = seedRawData.split(splitText);
        deletingInProgress = true;
        deleteAllWords();
        while (deletingInProgress);
        addWords();

    });
}

function fixFlatTermHebrew(flatTerm) {
    flatTerm = flatTerm.replaceAll('<div class="tpt_10_5pt"></div>','');
    flatTerm = flatTerm.replaceAll('<div class="tpt_13_5pt"></div>','');
    flatTerm = leaveOnlyHebrewLetteres(flatTerm).trim();
    //U+05D0 א
    //U+05EA ת

    return flatTerm;
}

function leaveOnlyHebrewLetteres(term){
    return term.replace(/[^\u05D0-\u05EA ]/g,'');    //remove anything other than the hebrew alpha-bet letters
    //todo: remove any single letter surrounded by 2 spaces.
}

//Add words
function addWords() {
    const date = new Date();
    for (let counter = 0; counter < seedDataArray.length; counter++) {
        (function (i) {
            let seedBody = splitText + seedDataArray[ i ];
            seedBody = seedBody.replaceAll('> ','>&nbsp;');
            seedBody = seedBody.replaceAll(' <','&nbsp;<');
            let flatTerm = seedBody.substring(flatTextPreText.length, seedBody.indexOf(flatTextPostText));
            flatTerm = fixFlatTermHebrew(flatTerm);
            console.log("Adding word: " + i + ') ' + flatTerm );
            return WordModel.create(
                { title: WORD_SEED_NAME + i,
                    title_flat: flatTerm,
                    body: seedBody,
                    body_flat: leaveOnlyHebrewLetteres(seedBody),
                    title_english: TITLE_ENGLISH,
                    subtitles_english: [SUB_TITLE_ENGLISH1, SUB_TITLE_ENGLISH2],
                    image: IMAGE,
                    created_at: date.getDate()
                });

        })(counter);
    }
}

function deleteAllUsers(){
    mongoose.connect(process.env.MONGODB_URI ||  "mongodb://localhost:27017", {poolSize: 100});
    console.log("Deleting all users");
    try {
        UserModel.deleteMany({createdAt: {$gte: 0}})
            .then(console.log('All Users successfully deleted')
            );
    } catch (err) {
        console.log(err);
    } finally {
        deletingInProgress = false;
    }
}

function deleteAllWords(){
    //mongoose.connect(process.env.MONGODB_URI ||  "mongodb://localhost:27017", {poolSize: 100});
    console.log("Deleting all words");
    try {
        WordModel.deleteMany({created_at: {$gte: 0}})
            .then(console.log('All Data successfully deleted')
            );
    } catch (err) {
        console.log(err);
    } finally {
        deletingInProgress = false;
    }
}

//Start
console.log("starting users recreate");
recreateUsers();
console.log("done users recreate");

setTimeout(()=>{
    console.log("starting words recreate");
    recreateWords();
    console.log("done words recreate");
    }, 4000);

