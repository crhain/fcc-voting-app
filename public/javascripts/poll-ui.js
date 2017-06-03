(function(self){
    //get page elements
    var pollVoteBtn = document.getElementById('poll-vote-btn');
    var newOptionBtn =  document.getElementById('new-option-btn');
    var deletePollBtn =  document.getElementById('delete-poll-btn');
    var shareTwitterBtn =  document.getElementById('share-twitter-btn');    
    var currentId = document.getElementById('poll-id').textContent;
    //#poll-form  -  on submit : for voteing
    //post to /poll/:id/vote
    pollVoteBtn.addEventListener('click', (e) =>{
        var selectedOption = document.getElementById('poll-options').value;
        var voteOption = selectedOption;
        var headers;
        var fetchInit;
        var body = {option: null};
        e.preventDefault();
        if(selectedOption === 'new'){
            voteOption = document.getElementById('new-option').value;
            if(voteOption === ""){
                //signal and error if new option not filled out
                console.log('please input a new option before voting!');
                return;
            } else {
                //set body json object                 
            }
        }    
        body.option = voteOption;
        //call vote api goes here
        headers = new Headers();
        headers.set("Content-Type", "application/json");           
        fetchInit = {
                method: 'POST',
                headers: headers,
                credentials: 'include',
                body: JSON.stringify(body)            
            };
        fetch('/polls/user/vote/' + currentId, fetchInit);        
        console.log('voting for ' + voteOption);        
    });
    
    //#delete-poll-btn - on click : for deleting the current poll
    //post to poll/delete/:id route
    deletePollBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        //should call confirm pop up first and then the following code in that dialog            
        var headers = new Headers();            ;
        var fetchInit = {
                method: 'DELETE',
                headers: headers,
                credentials: 'include',            
            };                                                         
            //add call to polls/user/new/
            fetch('/polls/user/delete/' + currentId, fetchInit);
            console.log('deleting current poll: ' + currentId);
            //redirect to new page in browser instead of from server
            window.location.href = "/polls/user/";    

    });

    //#share-twitter-btn - on click : for shareing url for poll on twitter
    //could impliment as an api call with url address to /api/twitter/:url route
    shareTwitterBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        //add call to /api/twitter/:url
        console.log('sharing on twitter...');        
    });

})(typeof self !== 'undefined' ? self : this);
