(function(self){
    //get page elements
    var pollVoteBtn = document.getElementById('poll-vote-btn');
    //var newOptionBtn =  document.getElementById('new-option-btn');    
    var deletePollBtn =  document.getElementById('delete-poll-btn');
    var shareTwitterBtn =  document.getElementById('share-twitter-btn');
    var pollOptionsSelect = document.getElementById('poll-options');
    var newOptionContainer = document.getElementById('new-option-container');    
    var currentId = document.getElementById('poll-id').textContent;
    var pollOptionSelected;
    
    //draw chart - requires poll-chart.js as module or loaded before this script in html file
    var myChart = chartjs.draw();
    //#poll-form  -  on submit : for voteing

    //SELECT poll__option
    var pollOptions = document.getElementsByClassName("poll__option");
    for(let i = 0; i < pollOptions.length; i++){
        pollOptions[i].addEventListener('click', function(e){
            for(let i = 0; i < pollOptions.length; i++){
                pollOptions[i].classList.remove('poll__option--selected');
            }
            this.classList.toggle('poll__option--selected');
            pollOptionSelected = this;
        });
    }
    

    //post to /poll/:id/vote
    pollVoteBtn.addEventListener('click', (e) =>{
        var selectedOptionId = pollOptionsSelect.value;
        var pollOptions = pollOptionsSelect.options;        
        var selectedOption = pollOptionsSelect.selectedOptions[0].textContent; 
        var pollOptionsArray = Array.prototype.slice.call(pollOptions);
        var pollOptionsCount = pollOptionsArray.length;                 
        var headers;
        var fetchInit;
        //for now, we get user name from menu, but in future we can use session cookie
        var voter = document.getElementById('poll-current-voter').textContent;
        //check to see if logged in.  If not, set to ip address that is stored on this page        
        var voteOption = {voter: voter, id: selectedOptionId, option: selectedOption, new: false};
        e.preventDefault();
        //console.log('my selected id is: ' + selectedOptionId);
        if(selectedOptionId === '-1'){
            voteOption.option = document.getElementById('new-option').value;           
            if(voteOption.option === ""){
                //signal and error if new option not filled out
                //console.log('please input a new option before voting!');
                showAlert('Please input a new option before voting!');
                return;
            //check to see if vote option same as in list    
            } else if(pollOptionsArray.find( (el) => el.textContent === voteOption.option )){
                //console.log('Option already exists!');
                showAlert('Option already exists!');
                return;
            } else {                
                //console.log('my next id is: ' + optionCount);
                voteOption.id = pollOptionsCount - 1;
                voteOption.new = true;
                //hack to trigger change event on pollOptionsSelect so that it
                //is hidden again after voteting
                pollOptionsSelect.value = '0'; //first option
                pollOptionsSelect.dispatchEvent(new Event('change'));                                                 
            }
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
        fetch('/polls/user/vote/' + currentId, fetchInit)
        .then((res)=>{
            return res.json();
        })
        .then((json)=>{
            //check json it has {voted: true}
            //if it does, inform user they have already voted
            //else
            if(json.voted){
                showAlert("You cannot vote more than once!");
                console.log('you cannot vote more than once');
            } else {
                updatePageWithNewData(json);
            }
            
        });        
        console.log('voting for ' + voteOption.option);        
    });
    
    pollOptionsSelect.addEventListener('change', (e)=>{
        var newOptionInput = document.getElementById('new-option');        
        if(pollOptionsSelect.value === '-1'){            
            newOptionInput.value = "";
            newOptionContainer.classList.remove('hidden');
        } else {        
            newOptionContainer.classList.add('hidden');            
        }
    });

    //#delete-poll-btn - on click : for deleting the current poll
    //post to poll/delete/:id route
    
    deletePollBtn && deletePollBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        //should call confirm pop up first and then the following code in that dialog            
        var headers = new Headers();            ;
        var fetchInit = {
                method: 'DELETE',
                headers: headers,
                credentials: 'include',            
            };                                                         
            //add call to polls/user/new/
            fetch('/polls/user/delete/' + currentId, fetchInit)
                .then(()=>{
                    //redirect to new page in browser instead of from server
                    window.location.href = "/polls/user/";
                });                            
    });

    //#share-twitter-btn - on click : for shareing url for poll on twitter
    shareTwitterBtn && shareTwitterBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        //add call to /api/twitter/:url
        console.log('sharing on twitter...');
        var pollURL = window.location;
        var tweet = "Check out my new poll at: " + pollURL;
        var twitterURL = "https://twitter.com/intent/tweet" + "?text=" + encodeURIComponent(tweet) + "&hashtags=poll";
        window.open(twitterURL, "Share");        
    });


    //Utility Functions

    function showAlert(message){
        var modalWindow = document.getElementById('modal-window');
        var modalMessage = document.getElementById('modal-message');
        modalMessage.textContent = message;
        modalWindow.classList.remove('closed');
    }

    function updatePageWithNewData(poll){
        console.log('I am updating the page with new data!');
        //console.log(json);
        // var pollResultsList = document.getElementById('poll-results-list');
        var pollResultsHTML = "";
        var pollOptionsSelectHTML = "";

        for(let i = 0; i < poll.pollOptions.length; i++){
            //update  poll results list
            pollResultsHTML += '<li class="option"><span class="option-name">';
            pollResultsHTML += poll.pollOptions[i].option + '</span> : ';
            pollResultsHTML += '<span class="option-count">' + poll.pollOptions[i].count + '</span></li>';
            //update poll options select options
            pollOptionsSelectHTML += '<option class="poll-option" value=' + i + '>';
            pollOptionsSelectHTML += poll.pollOptions[i].option + '</option>'; 
        }
        pollOptionsSelectHTML += '<option value="-1">Add new option</option>';
        
        // pollResultsList.innerHTML = pollResultsHTML;
        pollOptionsSelect.innerHTML = pollOptionsSelectHTML;
        var pollOptionCount = document.getElementById("poll__option-" + currentId)
        //add call to new chart.js update method that I still haven't written
        // chartjs.update(myChart);
    }

})(typeof self !== 'undefined' ? self : this);
