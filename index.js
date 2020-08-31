const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');
const generate = require('./utils/generateMarkdown');


// array of questions for user
const questions = [
    {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?'
},
{
    type: 'input',
    name: 'description',
    message: 'Provide a description of your project.'
},
{
    type: 'input',
    name: 'installation',
    message: 'Instructions for installing your project'
},
{
    type: 'input',
    name: 'usage',
    message: 'What are the uses of your project?'
},
{
    type: 'input',
    name: 'Contributing',
    message: 'List the contributing parties to the project:'
},
{
    type: 'input',
    name: 'username',
    message: 'What is your github username?'
},
{
    type: 'input',
    name: 'repo',
    message: 'Input the link to the github repo'
},


];

inquirer
    .prompt(questions)
    .then(function(data) {
        const queryUrl = `https://api.github.com/users/${data.username}`;
        // console.log(queryUrl)
        axios.get(queryUrl).then(function(res) {

            const usersGithubInfo = {
                email: res.data.email,
                name: res.data.name
            };

            fs.writeFile("README.md", generate(data, usersGithubInfo), function(err) {
                if (err) {
                    throw err;
                }
            });
            console.log(usersGithubInfo)
        });
    });

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {

}

// function call to initialize program
init();
