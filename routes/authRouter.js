const express = require("express");

const router = express.Router();

const { register, login, logout, localLogin } = require("../controllers/authController");

//All routes in this file start with "/api"

//FUNDAMENTAL ROUTES
router.post("/register", register);

router.get("/login", login);

router.get("/login/error", (request, response, next) => {
    //Kit: Send a simple response to confirm that code is operational. Great for routes you want to test without a controller handler function.
    return response.json("Login error");
});

router.get("/login/local", localLogin);

router.get("/logout", logout);

//ADVANCED ROUTES

//“checkAuthentication routing”
const checkAuthentication = (request, response, next) => {
    //We'll see if the request can be authenticated (request.isAuthenticated()) in the auth unit, however, for now, let's see if we get a 200 response. If the response isn't ok or equal to 200, return the next error.

    if (!response.ok) {
        return next();
    } else {
        response.json("Warning: user is not authenticated").redirect(403, "/unauthenticated");
    }
};

//Then, stage a get route of /admin where there is a callback function that has the checkAuth handler with the below routes inside of it.
router.get("/admin", checkAuthentication, (request, response, next) => {
    console.log("Passed admin route. Assessing authentication of user...")

    try {
        //Nested routes: start with "/api/admin/..."
        if (localLogin.call(response.result)) {
            function auth() {
                console.log("Auth successful within admin console.")
                response.json("Redirecting to webmaster route - http://localhost:3000/api/admin/auth")
                router.get("/admin/auth", checkAuthentication,(request, response, next) => {
                    response.json("Authenticated via route");
                });
            }
            auth()
        }
        
    } catch (error) {
        response.redirect("/api/unauthenticated")
    }
    }
    
);


// “/api/unauthenticated”
router.get("/unauthenticated", (request, response, next) => {
    console.log("Returning to the homepage...")
    response.redirect("/");
});


//More advanced authentication to come...

module.exports = router;