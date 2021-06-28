console.log("execution starts here");

getUser(1)
  .then((user) => GetRepos(user.GithubUserName))
  .then((repos) => console.log(repos))

  .catch((error) => console.log(error));

console.log("execution ends here");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Querying for the user...");
      resolve({ id: id, GithubUserName: "Sridhar" });
    }, 2000);
  });
}

function GetRepos(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Query for the user repos....");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}
