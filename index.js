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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">    <title>The Whole Team</title>
  </head>
  <body>
  <div class="container-fluid d-flex justify-content-center py-5 bg-primary text-light" style="font-size: 2rem">My Team</div>
  <div class="card-deck">
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
      insert = `<div class= "card" style="width: 18rem;">
      <div class="card-header bg-primary text-light" style="font-size: 2rem;">${name}</br><span style="font-size: 1.3rem;">${role}</span></div>
      <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${role}</li>
        <li class="list-group-item">ID: ${id}</li>
        <li class="list-group-item">Email: ${email}</li>
        <li class="list-group-item">Office Number: ${officeNumber}</li>
      </ul>
      </div>
      </div>
      `;
    } else if (role === "Engineer") {
      const github = teammate.getGithub();
      insert = `<div class = "card" style="width: 18rem;">
      <div class="card-header bg-primary text-light" style="font-size: 2rem;">${name}</br><span style="font-size: 1.3rem;">${role}</span></div>
      <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${role}</li>
        <li class="list-group-item">ID: ${id}</li>
        <li class="list-group-item">Email: ${email}</li>
        <li class="list-group-item">Github Username: ${github}</li>
      </ul>
      </div>
      </div>
      `;
    } else {
      const school = teammate.getSchool();
      insert = `<div class = "card" style="width: 18rem;">
      <div class="card-header bg-primary text-light" style="font-size: 2rem;">${name}</br><span style="font-size: 1.3rem;">${role}</span></div>
      <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${role}</li>
        <li class="list-group-item">ID: ${id}</li>
        <li class="list-group-item">Email: ${email}</li>
        <li class="list-group-item">School: ${school}</li>
      </ul>
      </div>
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
  const html = `
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    </body>
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
