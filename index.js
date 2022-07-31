const fs = require("fs");
const inquirer = require("inquirer");
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
  // Adds CSS styling to cards
  const css = `:root {
    --title-color: #253237;
    --main-bg-color: white;
    --manager-color: #5c6b73;
    --engineer-color: #447691;
    --intern-color: #39575c;
  }
  body {
    background-color: var(--main-bg-color);
    font-family: "Poppins", sans-serif;
  }
  .title {
    font-size: 2rem;
    background-color: var(--title-color);
    border-bottom: black 3px solid;
  }
  .name-card {
    font-size: 2rem;
  }
  .team-card {
    width: 18rem;
    box-shadow: 2px 2px 20px;
  }
  .manager-bg {
    background-color: var(--manager-color);
  }
  .engineer-bg {
    background-color: var(--engineer-color);
  }
  .intern-bg {
    background-color: var(--intern-color);
  }
  
  `;
  // This is the beginning mark up for roster.html
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://kit.fontawesome.com/ef7f054cb4.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="./style.css" />
    <title>The Whole Team</title>
  </head>
  <body>
  <div class="container-fluid d-flex justify-content-center py-5 text-light title">That's the Whole Team</div>
  <div class="container-fluid d-flex justify-content-center">
  <div class="row">
  `;
  // This will write the beginning of my roster.html file
  fs.writeFile("./dist/roster.html", html, function (err) {
    if (err) {
      console.log(err);
    }
  });
  // this will write the style.css file to my dist folder.
  fs.writeFile("./dist/style.css", css, function (err) {
    if (err) {
      console.log(err);
    }
  });
  console.log("Let's Begin");
}
// Function will add employees as they are created by the user in the terminal
function addHtml(teammate) {
  return new Promise(function (resolve, reject) {
    const name = teammate.getName();
    const role = teammate.getRole();
    const id = teammate.getId();
    const email = teammate.getEmail();
    let insert = "";
    if (role === "Manager") {
      const officeNumber = teammate.getOfficeNumber();
      insert = `<div class="col mt-5 d-flex justify-content-center">
      <div class= "card team-card">
      <div class="card-header text-light name-card manager-bg"><i class="fa-solid fa-user-tie mr-3"></i>${name}</div>
      <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${role}</li>
        <li class="list-group-item">ID: ${id}</li>
        <li class="list-group-item">Email: <a href = "mailto: ${email}">${email}</a></li>
        <li class="list-group-item">Office Number: ${officeNumber}</li>
      </ul>
      </div>
      <div class="card-footer">
      <small class="text-muted">${role}</small>
      </div>
      </div>
      </div>
      `;
    } else if (role === "Engineer") {
      const github = teammate.getGithub();
      insert = `<div class="col mt-5 d-flex justify-content-center">
      <div class= "card team-card">
      <div class="card-header text-light name-card engineer-bg"><i class="fa-solid fa-gear mr-3"></i>${name}</div>
      <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${role}</li>
        <li class="list-group-item">ID: ${id}</li>
        <li class="list-group-item">Email: ${email}</li>
        <li class="list-group-item">Github Username: <a target="_blank" href="https://www.github.com/${github}">${github}</a></li>
      </ul>
      </div>
      <div class="card-footer">
      <small class="text-muted">${role}</small>
      </div>
      </div>
      </div>
      `;
    } else {
      const school = teammate.getSchool();
      insert = `<div class="col mt-5 d-flex justify-content-center">
      <div class= "card team-card">
      <div class="card-header text-light name-card intern-bg"><i class="fa-solid fa-graduation-cap mr-3"></i>${name}</div>
      <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${role}</li>
        <li class="list-group-item">ID: ${id}</li>
        <li class="list-group-item">Email: ${email}</li>
        <li class="list-group-item">School: ${school}</li>
      </ul>
      </div>
      <div class="card-footer">
      <small class="text-muted">${role}</small>
      </div>
      </div>
      </div>
      `;
    }
    // After every addition the console will log "Added employee"
    // and the roster.html will have the appropriate code from above
    // appended to it.
    console.log("Added employee");
    fs.appendFile("./dist/roster.html", insert, function (err) {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}
// This will run when the user has confirmed they are done adding employees
// in the terminal and will append the end of roster.html
// When completed it will console log "That's the whole team!"
function finishHtml() {
  const html = `
    </div>
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
