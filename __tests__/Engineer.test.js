const Engineer = require("../lib/Engineer");

test("Should get github username from constructor", () => {
  const fakeGithub = "Patrickgp";
  const engineer = new Engineer(
    "Patrick",
    12345,
    "email@email.com",
    fakeGithub
  );
  expect(engineer.github).toBe(fakeGithub);
});

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
