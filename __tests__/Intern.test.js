const Intern = require("../lib/Intern");

// Test to get school input from Intern Constructor
test("Should set school selection from Intern Constructor", () => {
  const fakeSchool = "Pickle University";
  const intern = new Intern("Patrick", 12345, "email@email.com", fakeSchool);
  expect(intern.school).toBe(fakeSchool);
});

// Test to return school from getSchool()
test("Should return school through getSchool()", () => {
  const fakeSchool = "Pickle University";
  const intern = new Intern("Patrick", 12345, "email@email.com", fakeSchool);
  expect(intern.getSchool()).toBe(fakeSchool);
});

// Test to return Intern role from getRole()
test("Should return Intern from getRole()", () => {
  const fakeRole = "Intern";
  const intern = new Intern(
    "Patrick",
    12345,
    "email@email.com",
    "Pickle University"
  );
  expect(intern.getRole()).toBe(fakeRole);
});
