"use strict";

///////////////////////////////////////////////////////////////////////////////////////////////
//  CHARTJS                                                                                   
//    call chartjs.draw() on pages with charts to draw the chart                              
///////////////////////////////////////////////////////////////////////////////////////////////
var chartjs = function (self) {
  var chartModule = {};
  chartModule.draw = draw;
  chartModule.update = update;

  function update(chart) {
    var dataSet = getDataSetFromDOM(6);
    chart.data.labels = dataSet.labels;
    chart.data.datasets.forEach(function (dataset) {
      dataset.data = dataSet.data;
    });
    chart.update();
  }

  function draw() {
    //get context for chart    
    var ctx = document.getElementById("myChart").getContext('2d');
    var dataSet = getDataSetFromDOM(6);
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: dataSet.labels,
        datasets: [{
          label: '# of Votes',
          data: dataSet.data,
          backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)'],
          borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    });
    return myChart;
  } //end draw


  function getDataSetFromDOM(numberOfLabelsInChart) {
    var labelsCollection = document.getElementsByClassName('Chart__option-name');
    var dataCollection = document.getElementsByClassName('Chart__option-count'); // console.log("my options are: "); 
    // console.log(labelsCollection); 
    // console.log("my counts are: ");
    // console.log(dataCollection);        

    var dataSet = rollUpChartData(compileAndSortChartData(labelsCollection, dataCollection), numberOfLabelsInChart);
    return dataSet;
  }

  function compileAndSortChartData(labelsCollection, dataCollection) {
    var labelsArray = Array.prototype.map.call(labelsCollection, function (e) {
      return e.textContent;
    });
    var dataArray = Array.prototype.map.call(dataCollection, function (e) {
      return +e.textContent;
    }); // console.log("my labels array is: "); 
    // console.log(labelsArray); 
    // console.log("my data array is: ");
    // console.log(dataArray);

    var dataSetArray = [];
    var aggregate = 0; //add options and counts to data structure

    for (var i = 0; i < labelsArray.length; i++) {
      var dataSetItem = Object.create(null);
      dataSetItem.label = labelsArray[i];
      dataSetItem.data = dataArray[i];
      dataSetArray.push(dataSetItem);
    } //sort data by count


    dataSetArray.sort(function (a, b) {
      return b.data - a.data;
    });
    return dataSetArray;
  }

  function rollUpChartData(dataSetArray, numberOfLabelsInChart) {
    if (!numberOfLabelsInChart) {
      numberOfLabelsInChart = dataSetArray.length;
    }

    var stopValue = numberOfLabelsInChart - 1;
    var aggregateData = 0; //return dataSetArray; 

    var labelsArray = [];
    var dataArray = [];

    for (var i = 0; i < dataSetArray.length; i++) {
      if (i < stopValue) {
        labelsArray.push(dataSetArray[i].label);
        dataArray.push(dataSetArray[i].data);
      } else {
        aggregateData += dataSetArray[i].data;
      }
    }

    labelsArray.push('other');
    dataArray.push(aggregateData);
    return {
      labels: labelsArray,
      data: dataArray
    };
  }

  return chartModule;
}(typeof self !== 'undefined' ? self : undefined); ///////////////////////////////////////////////////////////////////////////////////////////////
// NAVIGATION MENU FUNCTIONS
//   - call navMenu.init() after html for nav menu
///////////////////////////////////////////////////////////////////////////////////////////////


var navMenu = function () {
  var navMenuModule = {};
  navMenuModule.init = init;
  var navAnimationTime = 800; //this is the time the navigation menu takes to close (miliseconds)

  function init() {
    var links = document.getElementsByClassName("navigation__link");

    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function (e) {
        e.preventDefault();
        var path = this.dataset.path;
        var navToggle = document.getElementById("navi-toggle");
        navToggle.checked = false;
        setTimeout(function (e) {
          location.assign(path);
        }.bind(this), navAnimationTime);
      });
    }
  }

  return navMenuModule;
}(); ///////////////////////////////////////////////////////////////////////////////////////////////
//TABBED MENU CODE                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////


var tabbedMenu = function () {
  var tabbedMenuModule = {};
  tabbedMenuModule.init = init;

  function init() {
    var tabs = document.querySelectorAll('.display-tabbed__tab');
    var panels = document.querySelectorAll('.display-tabbed__panel');
    var activeTab = "display-tabbed__tab--active";
    var activePanel = "display-tabbed__panel--active";

    for (var i = 0; i < tabs.length; i++) {
      (function () {
        var tab = tabs[i];
        var panel = panels[i];
        tab.addEventListener('click', function (e) {
          for (var _i = 0; _i < tabs.length; _i++) {
            tabs[_i].classList.remove(activeTab);
          }

          this.classList.add(activeTab);

          for (var _i2 = 0; _i2 < panels.length; _i2++) {
            panels[_i2].classList.remove(activePanel);
          }

          panel.classList.add(activePanel);
        });
      })();
    }
  }

  return tabbedMenuModule;
}(); ///////////////////////////////////////////////////////////////////////////////////////////////
//POLL VOTE CODE                                                                             //
///////////////////////////////////////////////////////////////////////////////////////////////


var showPageSetup = function () {
  var showPageSetup = {};
  showPageSetup.init = init;

  function init() {
    var voteBtn = document.getElementById("poll-vote-btn");
    var pollNewInput = document.getElementById("poll-input-new"); //add click handler for vote button

    voteBtn.addEventListener('click', function (e) {
      var pollNewRadio = document.getElementById("pollr-new");

      if (pollNewRadio.checked && !pollNewInput.value) {
        e.preventDefault();
      }
    }); //set focus on new option input when selected

    document.getElementById("pollr-new").addEventListener('change', function (e) {
      pollNewInput.focus();
    });
  }

  return showPageSetup;
}(); ///////////////////////////////////////////////////////////////////////////////////////////////
//NEW POLL FORM CODE                                                                         //
///////////////////////////////////////////////////////////////////////////////////////////////


var newPageSetup = function () {
  var newPageSetup = {};
  newPageSetup.init = init;

  function init() {
    var optBtn = document.getElementById('new-opt-btn');
    var option = document.getElementById('new-poll-options-v'); //add option handler

    var addOptionItem = function addOption() {
      var newOptions = document.getElementById('new-poll-options-h');
      var optionList = document.getElementById('option-display-list');
      var optionsInList = "";
      return function () {
        if (option.value === "") {
          return;
        }

        optionsInList += "<li class='OptionList__option'><span class='OptionList__option-name TextLabel--lg'>" + option.value + "</span></li>";
        newOptions.value += "|" + option.value;
        option.value = "";
        optionList.innerHTML = optionsInList;
      };
    }();

    optBtn.addEventListener('click', function (e) {
      addOptionItem();
      e.preventDefault();
    });
  }

  return newPageSetup;
}();