var ctx = document.getElementById("myChart").getContext('2d');
//get data from html
var options = Array.prototype.map.call(document.getElementsByClassName('option-name'), (e) => e.textContent);
var counts = Array.prototype.map.call(document.getElementsByClassName('option-count'), (e) => +e.textContent);
var data = [];
var aggregate = 0;

//if more than 5 items, collect additional into 'other' category
if(options.length > 5){
    //add options and counts to data structure
    for(var i = 0; i < options.length; i++){
        var dataItem = Object.create(null);
        dataItem.option = options[i];
        dataItem.count = counts[i];
        data.push(dataItem);        
    }    
    //sort data by count
    data.sort((a, b) => b.count-a.count);
    
    //add data back to options and counts
    options = [];
    counts = [];
    for(var j = 0; j < data.length; j++){
        if(j < 5){
            options.push(data[j].option);
            counts.push(data[j].count);
        } else{
            aggregate += data[j].count;
        }        
    }
    options.push('other');
    counts.push(aggregate);
}

var myChart = new Chart(ctx, {
type: 'pie',
data: {
    labels: options,
    datasets: [{
        label: '# of Votes',
        data: counts,
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
}
});