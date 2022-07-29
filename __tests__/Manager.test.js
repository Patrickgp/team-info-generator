const Manager = require("../lib/Manager");

// Test to return office number from Manager Constructor
test("Should return office number from Manager Constructor", () => {
  const fakeOfficeNo = 6789;
  const manager = new Manager(
    "Patrick",
    12345,
    "email@email.com",
    fakeOfficeNo
  );
  expect(manager.officeNumber).toBe(fakeOfficeNo);
});

// Test to return Manager role from getRole()
test("Should return Manager through getRole()", () => {
  const fakeRole = "Manager";
  const manager = new Manager("Patrick", 12345, "email@email.com", 6789);
  expect(manager.getRole()).toBe(fakeRole);
});

// Test to return office number from getOfficeNumber()
test("Should return office number from getOfficeNumber()", () => {
  const fakeOfficeNo = 6789;
  const manager = new Manager("Patrick", 12345, "email@email.com", 6789);
  expect(manager.getOfficeNumber()).toBe(fakeOfficeNo);
});
