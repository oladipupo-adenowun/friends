const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

function reformatDate(str){
    let [dd,mm,yyyy] = str.split("-");
    return new Date(`${yyyy}/${mm}/${dd}`);
}

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  // Send a JSON response containing the users array, formatted with an indentation of 4 spaces for readability
  res.send(JSON.stringify({users}, null, 4));
  //access via curl - curl localhost:5000/user/
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/email/:email",(req,res)=>{
  // Copy the code here
    const email = req.params.email;
    const filteredUser = users.filter((user)=>user.email === email);
    if(filteredUser.length > 0){
        res.send(filteredUser);
    }
    else{
        res.send(`User with email ${email} NOT found!`);
    }
  //access via curl - curl localhost:5000/user/email/joyalwhite@gamil.com
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/lastName/:lastName",(req,res)=>{
    // Copy the code here
      const lastName = req.params.lastName;
      const filteredUser = users.filter((user)=>user.lastName === lastName);
      if(filteredUser.length > 0){
          res.send(filteredUser);
      }
      else{
          res.send(`User with lastName ${lastName} NOT found!`);
      }
    //access via curl - curl localhost:5000/user/lastName/smith
  });

  //sort
  router.get('/sort',(req,res)=>{
    let sorted_users = users.sort((a,b)=>{
        let d1 = reformatDate(a.DOB);
        let d2 = reformatDate(b.DOB);
        return d1 - d2;
    });

    res.send(sorted_users);
  });

// POST request: Create a new user
router.post("/",(req,res)=>{
  //add new object to users
  users.push({
    "firstName":req.query.firstName,
    "lastName":req.query.lastName,
    "email":req.query.email,
    "DOB":req.query.DOB
  });
  res.send("The user "+req.query.firstName+" has been added");
  //to access via curl - curl --request POST 'localhost:5000/user?firstName=Von&lastName=Dre&email=vondre@@gamil.com&DOB=10/10/1995'
});


// PUT request: Update the details of a user by email ID
router.put("/email/:email", (req, res) => {
    const email = req.params.email;
    let filtered_users = users.filter((user)=>user.email === email);
    if(filtered_users.length > 0){
        let filtered_user = filtered_users[0];
        if(req.query.DOB){
            filtered_user.DOB = req.query.DOB;
        }
        
        if(req.query.firstName){
            filtered_user.firstName = req.query.firstName;
        }

        if(req.query.lastName){
            filtered_user.lastName = req.query.lastName;
        }

        users = users.filter((user)=> user.email != email);
        users.push(filtered_user);

        res.send(`User with email ${email} updated!`);
    }else{
        res.send("User not found!");
    }

    //to access via curl - curl --request PUT 'localhost:5000/user/email/vondre@gamil.com?DOB=01/01/1971'
});


// DELETE request: Delete a user by email ID
router.delete("/email/:email", (req, res) => {
  const email = req.params.email;
  users = users.filter((user)=>user.email != email);
  res.send(`User with email ${email} deleted!`);
  //access via curl - curl --request DELETE 'localhost:5000/user/email/joyalwhite@gamil.com'
});

module.exports=router;
