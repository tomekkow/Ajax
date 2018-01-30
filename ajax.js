$(document).ready(function() {

    $.ajax({
        type: 'GET',
        url: ' http://51.255.45.146:9100/all',

        success: function(data) {
            var row = "";
            var grouped = [];

            for (i = 0; i < data.length; i += 1) {
                var element = data[i];
                var myDate = new Date(element.timestamp * 1000);
                myDate = myDate.getDate() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getFullYear();
                var lastDay = grouped[grouped.length - 1];


                if (typeof lastDay !== 'undefined' && myDate === lastDay.date) {
                    lastDay.readings.push(element);
                } else {
                    grouped.push({ date: myDate, readings: [element] });
                }
            }
            for (var i = 0; i < grouped.length; i += 1) {
                const readings = grouped[i].readings;
                row += '<tr><td><h2>' + grouped[i].date + '</h2></td></tr>';
                row += '<tr><th>id</th><th>device_id</th><th>temperature</th><th>humidity</th><th>pm25</th><th>pm10</th><th>data </th></tr>';
                for (var j = 0; j < readings.length; j += 1) {
                    row +=
                        "<tr><td>" + j + "</td><td>" + readings[j].device_id + "</td><td>" + readings[j].temperature + "</td><td>" + readings[j].humidity + "</td><td>" + readings[j].pm25 + "</td><td>" + readings[j].pm10 + "</td><td>" + grouped[i].date + "</td></tr>";
                }
                var content = '<table>' + row + '</table>';
            }
            $(".content").append(content);
        },
        error: function() {
            console.log("error connection");
        }
    });
})