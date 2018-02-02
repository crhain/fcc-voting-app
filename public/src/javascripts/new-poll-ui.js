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
        var newPollTitleBox = document.getElementById('new-poll-name');
        var name = newPollTitleBox.value;
        var newPollQuestionBox = document.getElementById('new-poll-question');
        var question = newPollQuestionBox.value;
        var newPollOptionsBox = document.getElementById('new-poll-options'); 
        var newPollOptionsString =  newPollOptionsBox.value;
        var options = newPollOptionsString.split('\n').filter((option)=>{
                return !!option;
            });         
        var fetchInit;
        console.log("Is this working yet?");
        //check to see if fields filled in.  If they are not, throw an error
        if(!name || !newPollOptionsString){
            console.log("Fill out form data!");
            if(!name){
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

            // filter out blank enteries               
            var headers = new Headers();
            headers.set("Content-Type", "application/json");
            // NOTE: remove < and > tags to prevent xss attacks
            fetchInit = {
                method: 'POST',
                header: headers,
                credentials: 'include',
                cache: 'default',
                body: JSON.stringify({name: "hi", question: "sup", options: ["option 1", "option 2"]})            
            };
                                      
            //add call to polls/user/new/
            fetch('/polls', fetchInit)
                .then(()=>{
                    console.log('data sent just fine');
                    window.location.href = "/polls/";  
                });                   
        }                               
    });    

})(typeof self !== 'undefined' ? self : this);
