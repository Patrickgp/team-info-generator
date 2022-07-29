const Employee = require("../lib/Employee");

// Test for Employee Constructor
describe("Employee", () => {
  test("Should set name through the constructor", () => {
    const name = "Patrick";
    const employee = new Employee(name);
    expect(employee.name).toBe(name);
  });

  test("Should set ID through the constructor", () => {
    const fakeID = 12345;
    const employee = new Employee("Patrick", fakeID);
    expect(employee.id).toBe(fakeID);
  });

  test("Should set email through the constructor", () => {
    const fakeEmail = "email@email.com";
    const employee = new Employee("Patrick", 12345, fakeEmail);
    expect(employee.email).toBe(fakeEmail);
  });
});

// Test for getName()
describe("getName", () => {
  test("Should get name through getName()", () => {
    const fakeName = "Patrick";
    const employee = new Employee(fakeName);
    expect(employee.getName()).toBe(fakeName);
  });
});

// Test for getId()
describe("getId", () => {
  test("Should get ID through getId()", () => {
    const fakeID = 12345;
    const employee = new Employee("Patrick", fakeID);
    expect(employee.getId()).toBe(fakeID);
  });
});

// Test for getEmail()
describe("getEmail", () => {
  test("Should get Email through getEmail()", () => {
    const fakeEmail = "email@email.com";
    const employee = new Employee("Patrick", 12345, fakeEmail);
    expect(employee.getEmail()).toBe(fakeEmail);
  });
});

// Test for getRole()
describe("getRole", () => {
  test("Should get role through getRole()", () => {
    const fakeRole = "Employee";
    const employee = new Employee("Patrick", 12345, "email@email.com");
    expect(employee.getRole()).toBe(fakeRole);
  });
});
