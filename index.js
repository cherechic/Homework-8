var inquirer = require("inquirer");
var axios = require("axios");
var { easy } = require("./generateHTML");

function getUserInput() {
  return inquirer.prompt([
    {
      type: "input",
      message: "Please input your github Username",
      name: "username"
    },
    {
      type: "list",
      message: "Please pick your favorite color!",
      name: "color",
      choices: [
        {
          name: "Red",
          value: "red"
        },
        {
          name: "Blue",
          value: "blue"
        }
      ]
    }
  ]);
}

async function getGithubInfo(username) {
  var { data } = await axios.get(`https://api.github.com/users/${username}`);

  return JSON.stringify(data);
}
async function main() {
  var { username } = await getUserInput();
  var data = await getGithubInfo(username);
  easy(username, data);
}
main();
