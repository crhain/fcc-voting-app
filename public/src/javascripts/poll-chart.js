var chartjs = (function(self){
    var ctx = document.getElementById("myChart").getContext('2d');
    //get data from html
    var chartModule = {};
    chartModule.draw = draw;
    chartModule.update = update;
    
    function update(chart) {
        var dataSet = getDataSetFromDOM(6);
        chart.data.labels = dataSet.labels;
        chart.data.datasets.forEach((dataset) => {
            dataset.data = dataSet.data;
        });
        chart.update();
        
    }    

    function draw(){
        // var options = document.getElementsByClassName('option-name');
        // var counts = document.getElementsByClassName('option-count');
        // console.log("my options are: "); 
        // console.log(options); 
        // console.log("my counts are: ");
        // console.log(counts);
        var dataSet = getDataSetFromDOM(6);

        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: dataSet.labels,
                datasets: [{
                    label: '# of Votes',
                    data: dataSet.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options:{
                responsive: true,
                maintainAspectRatio: true
            }
        });
        return myChart;
    } //end draw

    function getDataSetFromDOM(numberOfLabelsInChart){        
        var labelsCollection = document.getElementsByClassName('poll__option-name');
        var dataCollection = document.getElementsByClassName('poll__option-count');
        // console.log("my options are: "); 
        // console.log(labelsCollection); 
        // console.log("my counts are: ");
        // console.log(dataCollection);        
        var dataSet = rollUpChartData( compileAndSortChartData(labelsCollection, dataCollection) , numberOfLabelsInChart);
        
        return dataSet;
    }

    function compileAndSortChartData(labelsCollection, dataCollection) {
        var labelsArray = Array.prototype.map.call(labelsCollection, (e) => e.textContent);
        var dataArray = Array.prototype.map.call(dataCollection, (e) => +e.textContent);
        // console.log("my labels array is: "); 
        // console.log(labelsArray); 
        // console.log("my data array is: ");
        // console.log(dataArray);
        var dataSetArray = [];
        var aggregate = 0;
        
        //add options and counts to data structure
        for(var i = 0; i < labelsArray.length; i++){
            var dataSetItem = Object.create(null);
            dataSetItem.label = labelsArray[i];
            dataSetItem.data = dataArray[i];
            dataSetArray.push(dataSetItem);        
        }    
        //sort data by count
        dataSetArray.sort((a, b) => b.data-a.data);

        return dataSetArray;
                       
    }

    function rollUpChartData(dataSetArray, numberOfLabelsInChart){
        if(!numberOfLabelsInChart){
            numberOfLabelsInChart = dataSetArray.length;
        }
        var stopValue = numberOfLabelsInChart - 1;
        var aggregateData = 0;
        
        //return dataSetArray; 
        var labelsArray = [];
        var dataArray = [];
        for(let i = 0; i < dataSetArray.length; i++){
            if(i < stopValue){
                labelsArray.push(dataSetArray[i].label);
                dataArray.push(dataSetArray[i].data);
            } else{
                aggregateData += dataSetArray[i].data;
            }        
        }
        labelsArray.push('other');
        dataArray.push(aggregateData);

        return {labels: labelsArray, data: dataArray};
    }

    return chartModule;
    
})(typeof self !== 'undefined' ? self : this)
