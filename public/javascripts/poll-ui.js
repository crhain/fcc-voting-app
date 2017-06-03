(function(self){
    //get page elements
    var pollVoteBtn = document.getElementById('poll-vote-btn');
    var newOptionBtn =  document.getElementById('new-option-btn');
    var deletePollBtn =  document.getElementById('delete-poll-btn');
    var shareTwitterBtn =  document.getElementById('share-twitter-btn');
    var pollOptionsSelect = document.getElementById('poll-options');    
    var currentId = document.getElementById('poll-id').textContent;
    //#poll-form  -  on submit : for voteing
    //post to /poll/:id/vote
    pollVoteBtn.addEventListener('click', (e) =>{
        var selectedOptionId = pollOptionsSelect.value;
        var pollOptions = pollOptionsSelect.options;        
        var selectedOption = pollOptionsSelect.selectedOptions[0].textContent; 
        var pollOptionsArray = Array.prototype.slice.call(pollOptions);
        var pollOptionsCount = pollOptionsArray.length;
        var voteOption = {id: selectedOptionId, option: selectedOption, new: false};
        var poll = {name: '', by: '', pollOptions: []};
        var headers;
        var fetchInit;
        e.preventDefault();
        //console.log('my selected id is: ' + selectedOptionId);
        if(selectedOptionId === '-1'){
            voteOption.option = document.getElementById('new-option').value;            
            if(voteOption.option === ""){
                //signal and error if new option not filled out
                console.log('please input a new option before voting!');
                return;
            //check to see if vote option same as in list    
            } else if(pollOptionsArray.find( (el) => el.textContent === voteOption.option )){
                console.log('Option already exists!');
                return;
            } else {                
                //console.log('my next id is: ' + optionCount);
                voteOption.id = pollOptionsCount - 1;
                voteOption.new = true;                 
            }
        } else {

            voteOption.option = document.getElementById('option_' + selectedOptionId).textContent;   
        }
        
        //call vote api goes here
        headers = new Headers();
        headers.set("Content-Type", "application/json");           
        fetchInit = {
                method: 'POST',
                headers: headers,
                credentials: 'include',
                body: JSON.stringify(voteOption)            
            };
        fetch('/polls/user/vote/' + currentId, fetchInit);        
        console.log('voting for ' + voteOption.option);        
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
