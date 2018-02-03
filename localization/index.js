function localize(language = "en"){
    var message = {};
    if(language === "en"){
        //ERROR MESSAGES
        message.Error = "Sorry, but we are experiencing some difficulties";
        message.PollDoesNotExist = "Sorry, that poll does not exist!";
        message.VoteOnlyOnce = "Sorry, but you can only vote once!";
        message.DidNotCreatePoll = "Unable to create your poll... something must be wrong...";
        message.RegistrationError = "Something went wrong with your registration.";
        message.NoPassword = "Please enter a password!";
        message.PasswordTooLong = "Your password is way too long!";
        message.PasswordTooShort = "Your password needs a bit more.";

        message.LoginError = "Wrong username or password!";
        

        //SUCCESS MESSAGES
        message.VoteSuccess = "Thanks for voting!";
        message.DeleteSuccess = "You have succesfully deleted a poll!";
        message.CreatedPoll = "Thank you for adding a new poll!";
        message.RegistrationSuccess = "Thank you for registering! Welcome to Polls Unlimited!";
        message.LogoutSuccess = "You have successfully logged out!";
    }
    return message;
}













module.exports = localize;