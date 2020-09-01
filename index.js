const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');
const generate = require('./utils/generateMarkdown');

// list of licenses pulled off of GitHub API's
    const licenses = {
        MIT : {
      "key": "mit",
      "name": "MIT License",
      "spdx_id": "MIT",
      "url": "https://api.github.com/licenses/mit",
      "node_id": "MDc6TGljZW5zZW1pdA=="
    },
     GNULesser : {
      "key": "lgpl-3.0",
      "name": "GNU Lesser General Public License v3.0",
      "spdx_id": "LGPL-3.0",
      "url": "https://api.github.com/licenses/lgpl-3.0"
    },
     Mozilla : {
      "key": "mpl-2.0",
      "name": "Mozilla Public License 2.0",
      "spdx_id": "MPL-2.0",
      "url": "https://api.github.com/licenses/mpl-2.0"
    },
        GNUAffero : {
      "key": "agpl-3.0",
      "name": "GNU Affero General Public License v3.0",
      "spdx_id": "AGPL-3.0",
      "url": "https://api.github.com/licenses/agpl-3.0"
    },
    Unlicense : {
      "key": "unlicense",
      "name": "The Unlicense",
      "spdx_id": "Unlicense",
      "url": "https://api.github.com/licenses/unlicense"
    },
    Apache : {
      "key": "apache-2.0",
      "name": "Apache License 2.0",
      "spdx_id": "Apache-2.0",
      "url": "https://api.github.com/licenses/apache-2.0"
    },
};
  const licenseChoices = Object.keys(licenses);

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
    name: 'contributing',
    message: 'List the contributing parties to the project:'
},
{
    type: 'list',
    name: 'license',
    message: 'Choose a license for the project',
    choices: licenseChoices
},
{
    type: 'input',
    name: 'tests',
    message: 'Provide instructions for running tests on this application'
},
{
    type: 'input',
    name: 'username',
    message: 'What is your github username?'
},
{
    type: 'input',
    name: 'email',
    message: 'What is your email?'
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
                name: res.data.name,
                profile: res.data.html_url,
                image: res.data.avatar_url
            };
            const licenseURL = licenses[data.license].url;

            fs.writeFile("README.md", generate(data, usersGithubInfo, licenseURL), function(err) {
                if (err) {
                    throw err;
                }
            });
            console.log(usersGithubInfo)
        });
    });

// function to write README file
// function writeToFile(fileName, data) {
// }

// function to initialize program
function init() {

}

// function call to initialize program
init();
