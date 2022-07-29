const Engineer = require("../lib/Engineer");

// Test for getting github username from the Engineer Constructor
test("Should get github username from Engineer Constructor", () => {
  const fakeGithub = "Patrickgp";
  const engineer = new Engineer(
    "Patrick",
    12345,
    "email@email.com",
    fakeGithub
  );
  expect(engineer.github).toBe(fakeGithub);
});

// Test to return Engineer role from getRole()
test("Should return Engineer from getRole()", () => {
  const fakeRole = "Engineer";
  const engineer = new Engineer(
    "Patrick",
    12345,
    "email@email.com",
    "patrickgp"
  );
  expect(engineer.getRole()).toBe(fakeRole);
});

// Test to return github username from getGithub()
test("Should get github username through the getGithub()", () => {
  const fakeGithub1 = "Patrickgp";
  const engineer = new Engineer(
    "Patrick",
    12345,
    "email@email.com",
    fakeGithub1
  );
  expect(engineer.getGithub()).toBe(fakeGithub1);
});
