console.log("Execution starts here");

getUser(
  1,
  (callback = (user) => {
    console.log(user);
  })
);

getRepository(
  "sridhar",
  (repocallback = (userepos) => {
    console.log(userepos);
  })
);

console.log("Execution finished");

function getUser(id) {
  setTimeout(() => {
    console.log("Querying the database of the user ....");
    callback({ id: id, GithubUserName: "Sridhar" });
  }, 2000);
}

function getRepository(username) {
  setTimeout(() => {
    console.log("querying the database for the repository ....");
    repocallback({ username: username, Repos: ["repo1", "repo2", "repo3"] });
  }, 2000);
}
