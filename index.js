const fs = require("fs");
const inquirer = require("inquirer");
const { start } = require("repl");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const employees = [];

function init() {
  startHtml();
  addEmployee();
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Provide employees name: ",
        name: "name",
      },
      {
        type: "input",
        message: "Provide employees ID: ",
        name: "id",
      },
      {
        type: "input",
        message: "Provide employees email: ",
        name: "email",
      },
      {
        type: "list",
        message: "Provide employees role in the organization: ",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role",
      },
    ])
    .then(function ({ name, role, id, email }) {
      let roleSelection = "";
      if (role === "Manager") {
        roleSelection = "office number: ";
      } else if (role === "Engineer") {
        roleSelection = "Github username: ";
      } else {
        roleSelection = "School they are currently enrolled in: ";
      }
      inquirer
        .prompt([
          {
            type: "input",
            message: `Provide employee's ${roleSelection}`,
            name: "roleSelection",
          },
          {
            type: "list",
            message: "Would you like to add more employees?",
            choices: ["Yes", "No"],
            name: "moreEmployees",
          },
        ])
        .then(function ({ roleSelection, moreEmployees }) {
          let newEmployee;
          if (role === "Manager") {
            newEmployee = new Manager(name, id, email, roleSelection);
          } else if (role === "Engineer") {
            newEmployee = new Engineer(name, id, email, roleSelection);
          } else {
            newEmployee = new Intern(name, id, email, roleSelection);
          }
          employees.push(newEmployee);
          addHtml(newEmployee).then(function () {
            if (moreEmployees === "Yes") {
              addEmployee();
            } else {
              finishHtml();
            }
          });
        });
    });
}

function startHtml() {
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The Whole Team</title>
  </head>
  <body>
  `;
  fs.writeFile("./dist/roster.html", html, function (err) {
    if (err) {
      console.log(err);
    }
  });
  console.log("Let's Begin");
}

function addHtml(teammate) {
  return new Promise(function (resolve, reject) {
    const name = teammate.getName();
    const role = teammate.getRole();
    const id = teammate.getId();
    const email = teammate.getEmail();
    let insert = "";
    if (role === "Manager") {
      const officeNumber = teammate.getOfficeNumber();
      insert = `<div class = "col-12">
      <h1>${name}</h1>
      <ul>
        <li>ID: ${id}</li>
        <li>Email: ${email}</li>
        <li>Office Number: ${officeNumber}</li>
      </ul>
      </div>
      `;
    } else if (role === "Engineer") {
      const github = teammate.getGithub();
      insert = `<div class = "col-12">
      <h1>${name}</h1>
      <ul>
        <li>ID: ${id}</li>
        <li>Email: ${email}</li>
        <li>Github Username: ${github}</li>
      </ul>
      </div>
      `;
    } else {
      const school = teammate.getSchool();
      insert = `<div class = "col-12">
      <h1>${name}</h1>
      <ul>
        <li>ID: ${id}</li>
        <li>Email: ${email}</li>
        <li>School: ${school}</li>
      </ul>
      </div>
      `;
    }
    console.log("Added employee");
    fs.appendFile("./dist/roster.html", insert, function (err) {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

function finishHtml() {
  const html = `</body>
  </html> 
  `;

  fs.appendFile("./dist/roster.html", html, function (err) {
    if (err) {
      console.log(err);
    }
  });
  console.log("That's the whole team!");
}

init();
