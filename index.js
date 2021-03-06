const inquirer = require("inquirer");
//const axios = require("axios");
const fs = require("fs");
const path = require("path");

// array of questions for user
const questions = [
    //     title of your project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
    {
        type: "input",
        message: "What is your Project Title?",
        name: "projectTitle",
    },

    {
        type: "input",
        message: "Provide detail description",
        name: "projectDescription",
    },

    {
        type: "input",
        message: "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.",
        name: "installationInstruction",
    },
    {
        type: "input",
        message: "Provide instructions for use.",
        name: "usageInstruction",
    },
    {
        type: "list",
        name: "license",
        message: "Select a License ",
        choices: ["MIT", "Apache 2.0", "BSD-3", "GPLv3", "ISC"],
    },
    {
        type: "input",
        message: "Provide guidelines on how to contribute to this project.",
        name: "contributingInstruction",
    },
    {
        type: "input",
        message: "Provide examples on how to run tests.",
        name: "tests",
    },

    // {
    //     type: "input",
    //     message: "Questions?",
    //     name: "questions"
    // },
    {
        type: "input",
        message: "What is your GitHub user name?",
        name: "gitHubUsername",
    },
    {
        type: "input",
        message: "What is your E-mail?",
        name: "email",
    },
];

// function to write README file
function writeToFile(fileName, data) {
    var writeResult = fs.writeFileSync(
        path.join(__dirname, "../ReadMeGenerator", fileName),
        data
    );

    console.log("file generated....");
}

// function to initialize program
function init() {
    console.log(`Begin`);
    const userResponse = inquirer.prompt(questions).then(function(userResponse) {
        console.log(`starting`);
        console.log(userResponse);
        const gitUsername = userResponse.gitHubUsername;
        const projectTitle = userResponse.projectTitle;
        const projectDescription = userResponse.projectDescription;

        const installationProcess = userResponse.installationInstruction;

        const instruction = userResponse.usageInstruction;

        // const instructionExample = userResponse.instructionExample;

        const licenseName = userResponse.license;
        let licenseLogo = "";
        let licenseText = "";
        switch (licenseName) {
            case "MIT":
                licenseLogo = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) `;
                licenseText = `[MIT](https://opensource.org/licenses/MIT) License. `;
                break;
            case "Apache 2.0":
                console.log('Came here at Apache');
                licenseLogo = `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;

                licenseText = `[Apache-2.0](https://opensource.org/licenses/Apache-2.0) License. `;
                break;
            case "BSD-3":
                console.log('Came here at BSD-3');
                licenseLog = `[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`;
                licenseText = `[BSD-3-Clause](https://opensource.org/licenses/BSD-3-Clause) License. `;
                break;

            case "GPLv3":
                licenseLogo = `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
                licenseText = `[gpl-3.0](https://opensource.org/licenses/gpl-3.0) License. `;
                break;

            case "ISC":
                licenseLogo = `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`;
                licenseText = `[ISC](https://opensource.org/licenses/ISC) License. `;
                break;
            default:
                break;
        }
        console.log(licenseLogo);
        // const licenseUrl = userResponse.licenseUrl;

        const Contributing =
            "Please use my e-mail to contact me on how to contribute to this project.";

        const tests = userResponse.tests;

        const gitHubUserName = userResponse.gitHubUsername;

        const email = userResponse.email;

        // // fetching data from git

        // user
        /*
                            const gitResponse = await axios.get(`https://api.github.com/users/${gitUsername}`);
                            const gitData = gitResponse.data;
                            const gitName = gitData.login;
                            const gitEmail = gitData.email;
                            const gitlocation = gitData.location;
                            const gitUrl = gitData.html_url;
                            const gitProfileImage = gitData.avatar_url;
                */
        // contributor
        /*
                    const contributorUserNamesArray = contributorUserNames.split(",");
                    console.log(contributorUserNamesArray);
                    // const  = listOfContributorsUserNames.
                    // contributorsGitUserName
                    var resultContributor;
                    for (i = 0; i < contributorUserNamesArray.length; i++) {
                        var contributorsGitUserName = contributorUserNamesArray[i]
                        const gitResponse2 = await axios.get(`https://api.github.com/users/${contributorsGitUserName}`);
                        var gitContribuProfileImage = gitResponse2.data.avatar_url;
                        var gitContribuUrl = gitResponse2.data.html_url;
                        var gitContribuEmail = gitResponse2.data.email;
                        var resultContributor = resultContributor + (`
                            \n <img src="${gitContribuProfileImage}" alt="drawing" width="150" display="inline"/> ${contributorsGitUserName}  GitHubLink: ${gitContribuUrl}`);
                    }
                */
        var result = `
${licenseLogo}
# ${projectTitle} 
\n* [Description](#Description)
\n* [Installation](#Installation)
\n* [Instructions](#Instructions)
\n* [License](#License)
\n* [Contribute](#Contribute)
\n* [Tests](#Tests)
\n* [Questions](#Questions)
## Description
${projectDescription}
## Installation
${installationProcess}
## Instructions
${instruction}
## License 
This project is licensed under the ${licenseText} 
## Contribute
${Contributing}
## Tests
${tests}
## Questions
https://github.com/${gitHubUserName}
\n
${email}
`;
        writeToFile("README.md", result);
    });
}

// function call to initialize program
init();