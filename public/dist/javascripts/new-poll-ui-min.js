"use strict";!function(e){document.getElementById("new-poll-form");document.getElementById("new-poll-submit-btn").addEventListener("click",function(e){e.preventDefault();var t,n,l=document.getElementById("new-poll-title").value,o=document.getElementById("new-poll-options").value.split("\n").filter(function(e){return!!e});!l||o<1?console.log("Fill out form data!"):((t=new Headers).set("Content-Type","application/json"),n={method:"POST",headers:t,credentials:"include",cache:"default",body:JSON.stringify({title:l,options:o})},fetch("/polls/user/new",n),console.log("adding poll: "+l))})}("undefined"!=typeof self&&self);