(function(self){
    window.addEventListener('load', (e) => {
        var currentPage = document.getElementsByClassName('section')[0].id;
        //console.log('my page id is: ', currentPage);
        switch(currentPage){
            case 'home-page':
                document.getElementById('nav-home').classList.add('pure-menu-selected');
                break;
            case 'polls-page':    
                document.getElementById('nav-polls').classList.add('pure-menu-selected');
                break;
            case 'my-polls-page':    
                document.getElementById('nav-mypolls').classList.add('pure-menu-selected');
                break;
            case 'new-poll-page':
                document.getElementById('nav-newpoll').classList.add('pure-menu-selected');
                break;
            default:
                break;        
        }        
    });
    
})(typeof self !== 'undefined' ? self : this);