console.log("Execution starting");

const user = FakeDatabaseOperations(1);

console.log(user);
console.log("After the Execution");

function FakeDatabaseOperations() {
  setTimeout(() => {
    console.log("Querying the database for the user....");
    return { id: id, GithubUserName: "Ashish123" };
  }, 2000);
}

// The main reason for using the async concepts in java script lies here
// if we predict the out put of the above code:
//it should be (expected output)
/*
{ 
    id : 1,
    GithubUserName: "Ashish123"
}
*/

//but the actual output is (actual output)
/*
undefined
*/

//reason: the function is being called before printing the user to console but that is not what is quite happening here
// infact we had a set timeout function in the FakeDatabaseOperations so the values are returned only after the 2 seconds but
// by the time values are returned all the other statements are already executed since a;; the other statements
//including the `console.log(user)` is a direct statments. so it is empty while printing and undefined is printed
//here comes the importance of await and async keywords.
