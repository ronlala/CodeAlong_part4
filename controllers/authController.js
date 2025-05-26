//const userRoster = require("../data/userRoster");

//NEW: Define the User Model
const User = require("../models/userModel");

const register = async (request, response, next) => {
  const { firstName, lastName, username, password } = request.body;
  console.log(request.body);
  //Error handling can be reactivated in the auth unit.

    if (error) {
        return next(error);
    } else if (!firstName || !username || !password) { // Confirm required fields are not empty before any other work
      return response.status(400).json({
        error: { message: "Missing required fields." },
        statusCode: 400,
      });
    }

  try {
    //Make some "salty hash browns" here in Authentication.

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password, //upgrade password later
      //more advanced auth...
    };

    //Send a simple log to confirm that code is operational
    console.log(
      "Registration successful outside of local authentication feature."
    );

    // for (const user of userRoster) {
    //     console.log(user, "User Roster")
    // }
    // //OR
    // console.log(userRoster[0], "Logging webmaster");
    // console.log(userRoster[1], "Logging administrator");

    newUser.save(); //formerly userRoster.push(newUser)

    //call the mockPassport function to check login but not needed for now.

    // Yusuf: AFTER user is saved AND logged in, we can change the password to undefined. Luckily, our database, MongoDB, by default will not send any undefined values in the response.
    newUser.password = undefined;

    return response.status(201).json({
      success: { message: "New user is created" },
      data: { newUser },
      statusCode: 201,
    });
  } catch (error) {
    return response.status(500).json({
      error: { message: "Internal server error" },
      statusCode: 500,
    });
  }
};

const login = async (request, response, next) => {
  response.status(200).json({
    success: { message: "User logged in." },
  });
};

const localLogin = async (request, response, next) => {
  //Comment out the following:
  //create a simpler iterator that stores the userRoster
  // const user = userRoster;
  // console.log(user, "before");

  // userCopy = user; //Value Transfer

  // console.log(userCopy, "copy of user");

  // let result = true;

  //5.1 Per 4 Code Start:
  // We will make a copy of the user, then change the password of the copy. MongoDB by default will not send any undefined values in the response.
  const userCopy = { ...req.user._doc };
  userCopy.password = undefined;

  //Kit: In the authentication unit, we'll use a special middleware called Passport to authenticate local checks. For now, this function emulates that functionality.
  function mockPassport(err, user) {
    //error handling as a final check and a failsafe
    if (err) {
      return next(err);
    }

    //if there is not a user detected
    //Error handling can be reactivated in the auth unit.
        if (!user) {
            return response.status(401).json({
                error: { message: "There is not a user detected. Please try again." },
            });
        }


    //This code snippet can reactivated in the auth unit.
    /*
        //use the login method to confirm the user
        request.login(user, (err) => {
            
            //Kit: error handling a second time to re-confirm
            if (err) {
                return next(err)
            }
            //We'll create a copy of the user by destructuring the request of the user's id and set the user's copied password to undefined for security.
           

            //Log the user copied data.
            

            //Yusuf: Send the response in the login function. This will wait for it to complete. If not in here, possible errors, being sent before login function completed
            response.status(200).json({
                success: { message: "Login successful within local authentication feature." },
                //Reference the user copied data with a key of data and a value as an object with a secondary key of user and the secondary value being the userCopy.
            });
        })
        */
  }
  //call the mockPassport feature
  mockPassport();

  //Yusuf: Send the response in the login function. (Simple Version)
  response.status(200).json({
    success: { message: "Login successful." },
    data: { user: userCopy },
    result: result,
  });
};

const logout = async (request, response, next) => {
  console.log("Initializing logout controller logic...");

  // destroy the session on logout so unauthorized calls will be blocked
  console.log("Session destroyed");
  response.clearCookie("connect.sid");
  //console.log(response, "Res after clear cookies") //Kit: you can visualize the response object and the information generated. It is a lot of information, so don't have this log in production.

  //We won't use the return keyword here because we want the remainder of the code to run after confirmation.
  response.status(200).json({
    success: { message: "User logged out!" },
    statusCode: 200, //return the status code
  });

  //Kit: In the authentication unit, we'll use a special middleware called Passport to authenticate local checks. For now, this function emulates that functionality.
  function sessionDestruction(err) {
    //error handling as a final check and a failsafe
    if (err) {
      return next(err);
    }

    //Kit: use the logout method to logout the user, destroy the session, clean up cookies from the browser and then return a response after cleaning up. This helps protect sessions, especially if as a developer, you walk away from your project, and you don't want anyone else accessing sensitive information after you.

    //This code snippet can reactivated in the auth unit.
    /*
        request.logout((err) => {
            if (err) {
              return next(err);
            }

            // destroy the session on logout so unauthorized calls will be blocked
            request.session.destroy((err) => {
                if (err) {
                    return next(err);
                }
            })
            // Clear the cookie from the browser
            response.clearCookie("connect.sid");
            return response.status(200).json({
                success: { message: "User logged out!" },
                statusCode: 200, //return the status code
            });
        })
        */
  }
  sessionDestruction();
  console.log("Logout function activated. Logging out...");
};

module.exports = { register, login, logout, localLogin };