(function(self){
    //get page elements
    var pollForm = document.getElementById('poll-form');
    var newOptionBtn =  document.getElementById('new-option-btn');
    var deletePollBtn =  document.getElementById('delete-poll-btn');
    var shareTwitterBtn =  document.getElementById('share-twitter-btn');
    
    //#poll-form  -  on submit : for voteing
    //post to /poll/:id/vote
    pollForm.addEventListener('submit', (e) =>{
        var selectedOption = document.getElementById('poll-options').value;
        var voteOption = selectedOption;
        e.preventDefault();
        if(selectedOption === 'new'){
            voteOption = document.getElementById('new-option').value;
            if(voteOption === ""){
                //signal and error if new option not filled out
                console.log('please input a new option before voting!');
                return;
            } else {
                //logic to add new option goes here
            }
        }    
        //call vote api goes here    
        console.log('voting for ' + voteOption);        
    });
    
    //#delete-poll-btn - on click : for deleting the current poll
    //post to poll/delete/:id route
    deletePollBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        //add call to poll/:id/delete
        console.log('deleting current poll...');        
    });

    //#share-twitter-btn - on click : for shareing url for poll on twitter
    //could impliment as an api call with url address to /api/twitter/:url route
    shareTwitterBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        //add call to /api/twitter/:url
        console.log('sharing on twitter...');        
    });

})(typeof self !== 'undefined' ? self : this);
