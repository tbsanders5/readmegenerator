// function to generate markdown for README
function generateMarkdown(data, usersGithubInfo, licenseURL) {
  return `# **${data.title}**
  [![${data.license}](https://img/shields.io/badge/License-${licenseURL}-blue)](${licenseURL})

  ## Description ##

  ${data.description}

  ## Table Of Contents ##

  - [Description](#Description)
  - [Installation](#Installation)
  - [Usage](#Usage)
  - [Contributors](#Contributors)
  - [License](#License)
  - [Tests](#Tests)
  - [Repository](#Repository)
  - [Questions](#Questions)

  ## Installation ##

  ${data.installation}

  ## Usage ##

  ${data.usage}

  ## Contributors ##

  ${data.contributing}

  ## License ##

  ${licenseURL}

  ## Tests ##

  ${data.tests}

  ## Repository ##

  - [My Projects Repository](${data.repo})

  ## Questions ##

  ![My Profile Picture](${usersGithubInfo.image})
  - ${usersGithubInfo.name}
  - [My Profile](${usersGithubInfo.profile})
  - ${data.email}

`;
}

module.exports = generateMarkdown;
