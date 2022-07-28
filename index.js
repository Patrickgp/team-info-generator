const fs = require("fs");
const inquirer = require("inquirer");
// const Engineer = require("./lib/Engineer");
// const Intern = require("./lib/Intern");
// const Manager = require("./lib/Manager");

const employees = [];

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
    });
  inquirer
    .prompt([
      {
        type: "input",
        message: `Provide employee's ${roleSelection}`,
        name: "roleSelection",
      },
      {
        type: "confirm",
        message: "Would you like to add more employees?",
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
    });
}

addEmployee();
