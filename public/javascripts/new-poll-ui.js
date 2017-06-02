(function(self){
    //get page elements
    var newPollForm = document.getElementById('new-poll-form');    
    var newPollSubmitBtn =  document.getElementById('new-poll-submit-btn');
    
    //#poll-form  -  on submit : for voteing
    //post to /poll/:id/vote
    //newPollForm.addEventListener('submit', (e) =>{        
    //    e.preventDefault();            
        //call vote api goes here    
    //    console.log('voting for ' + voteOption);        
    //});
    
    //#delete-poll-btn - on click : for deleting the current poll
    //post to poll/delete/:id route
    newPollSubmitBtn.addEventListener('click', (e)=>{
        var newPollTitle =  document.getElementById('new-poll-title').value;
        var newPollOptions =  document.getElementById('new-poll-options').value;        
        e.preventDefault();
        //add call to poll/:id/delete
        console.log('adding poll: ' + newPollTitle);
        console.log('with the following options:');
        console.log(newPollOptions);        
    });    

})(typeof self !== 'undefined' ? self : this);
