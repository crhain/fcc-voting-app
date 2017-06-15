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
        e.preventDefault();
        var newPollTitleBox = document.getElementById('new-poll-title');
        var newPollTitle = newPollTitleBox.value;
        var newPollOptionsBox = document.getElementById('new-poll-options'); 
        var newPollOptionsString =  newPollOptionsBox.value;
        var newPollOptions = newPollOptionsString.split('\n').filter((option)=>{
                return !!option;
            }); 
        var headers;
        var fetchInit;
        //check to see if fields filled in.  If they are not, throw an error
        if(!newPollTitle || !newPollOptionsString){
            console.log("Fill out form data!");
            if(!newPollTitle){
                newPollTitleBox.classList.add('error');                                
            } else {
                newPollTitleBox.classList.remove('error');
            }

            if(!newPollOptionsString){
                newPollOptionsBox.classList.add('error');
            } else {
                newPollOptionsBox.classList.remove('error');
            }
            
        } else {
            //remove errors from form if they exist
            newPollTitleBox.classList.remove('error');
            newPollOptionsBox.classList.remove('error');

            //filter out blank enteries               
            headers = new Headers();
            headers.set("Content-Type", "application/json");
            //NOTE: remove < and > tags to prevent xss attacks
            fetchInit = {
                method: 'POST',
                headers: headers,
                credentials: 'include',
                cache: 'default',
                body: JSON.stringify({title: newPollTitle, options: newPollOptions})            
            };              
            //add call to polls/user/new/
            fetch('/polls/user/new', fetchInit)
                .then(()=>{
                    window.location.href = "/polls/user/";  
                });
            console.log('adding poll: ' + newPollTitle);            
        }                               
    });    

})(typeof self !== 'undefined' ? self : this);
