var chart;
var attempts = 0;
function makeGraph(){
        var num1 = $('#dataPoint1').val();
        var num2 = $('#dataPoint2').val();
        var num3 = $('#dataPoint3').val();
        var num4 = $('#dataPoint4').val();
        var num5 = $('#dataPoint5').val();
        var num6 = $('#dataPoint6').val();
        var xAxis1 = $('#xAxis1').val();
        var xAxis2 = $('#xAxis2').val();
        var xAxis3 = $('#xAxis3').val();
        var xAxis4 = $('#xAxis4').val();
        var xAxis5 = $('#xAxis5').val();
        var xAxis6 = $('#xAxis6').val();
        var xAxisTitle = $('#xAxisTitle').val();


        chart = new Contour({
                el: '#Chart',
                xAxis: { orient: 'bottom' },
                xAxis: { categories: [xAxis1, xAxis2, xAxis3, xAxis4, xAxis5, xAxis6] },
                xAxis: { title: xAxisTitle },
                yAxis: { max: 100 },
                chart: { animations : { enable: true } } 
        })
        .cartesian()
        .line([num1, num2, num3, num4, num5, num6])
        .render();
};

function randomGraph(){
        if (attempts == 0) {
                var numero1 = Math.floor((Math.random() * 100) + 1);
                var numero2 = Math.floor((Math.random() * 100) + 1);
                var numero3 = Math.floor((Math.random() * 100) + 1);
                var numero4 = Math.floor((Math.random() * 100) + 1);
                var numero5 = Math.floor((Math.random() * 100) + 1);
                var numero6 = Math.floor((Math.random() * 100) + 1);
                var data = [numero1, numero2, numero3, numero4, numero5, numero6,];
                chart = new Contour({
                        el: '#exampleChart',
                        xAxis: { orient: 'bottom' },
                        xAxis: { categories: ['X 1', 'X 2', 'X 3', 'X 4', 'X 5', 'X 6'] },
                        xAxis: { title: 'X Axis' },
                        yAxis: { max: 100 },
                        chart: { animations : { enable: true } } 
                })
                .cartesian()
                .line(data)
                .render();
                attempts++;
        } else {
                console.log("One random at a time");
        }
}
function closeGraph(){
        $('#exampleChart').css('display','none');
        $("#exampleChart").empty();
        attempts = 0;
}
function addGraphData(){
        var user = Parse.User.current();
        var name = $('#name1').val();
        var num1 = $('#num1').val();
        var num2 = $('#num2').val();
        var num3 = $('#num3').val();
        var num4 = $('#num4').val();
        var num5 = $('#num5').val();
        var num6 = $('#num6').val();
        // Number input is recognised as String so Number() type conversition for input to database
        var SetNum1 = Number(num1);
        var SetNum2 = Number(num2);
        var SetNum3 = Number(num3);
        var SetNum4 = Number(num4);
        var SetNum5 = Number(num5);
        var SetNum6 = Number(num6);


        var GraphData = Parse.Object.extend("GraphData");
        var graphData = new GraphData();

        graphData.set("Name", name);
        graphData.set("Point1", SetNum1);
        graphData.set("Point2", SetNum2);
        graphData.set("Point3", SetNum3);
        graphData.set("Point4", SetNum4);
        graphData.set("Point5", SetNum5);
        graphData.set("Point6", SetNum6);
        graphData.set("User", user);

        graphData.save(null, {
              success: function(graphData) {
            // Execute any logic that should take place after the object is saved.
            alert('Data added');
            updateGraphList();
    },
    error: function(graphData, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
    }
});
}
function profileGraphView(){
        var user = Parse.User.current();
        var name = $("#graphList").val();
        var GraphData = Parse.Object.extend("GraphData");
        var query = new Parse.Query(GraphData);
        query.equalTo("Name", name);
        query.find({success: querySuccess, error: error});
        function querySuccess(GraphData) {
            for (var i = 0; i < GraphData.length; i++) {
                var point1 = GraphData[i].get('Point1');
                var point2 = GraphData[i].get('Point2');
                var point3 = GraphData[i].get('Point3');
                var point4 = GraphData[i].get('Point4');
                var point5 = GraphData[i].get('Point5');
                var point6 = GraphData[i].get('Point6');

                  
                  chart = new Contour({
                        el: '#ProfileChart',
                        xAxis: { orient: 'bottom' },
                        xAxis: { categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'] },
                        xAxis: { title: 'Week' },
                        yAxis: { max: 100 },
                        chart: { animations : { enable: true } } 
                        })
                        .cartesian()
                        .line([point1, point2, point3, point4, point5, point6])
                        .render();
                }
        }

        function error(error) {
            alert("Error: " + error.code + " " + error.message);
        }

}

function graphTypeSelect(){
    var graphType = $('#graphTypeList').val();
    var dataPoints = $('#pointsNumberList').val();

    if (graphType == "Line"){
        $('#graph').css('display','none');
        $('#lineGraph').css('display','inline');
        for (var i = 1; i <= dataPoints; i++) {
            $('#lineGraphForm').append("<label> x Axis Label" + i +"</label><br>");
            $('#lineGraphForm').append("<input type='text' id='xAxis" + i +"' value=''><br>");
             $('#lineGraphForm').append("<label> Point" + i + "</label><br>");
             $('#lineGraphForm').append("<input type='number' id='dataPoint" + i +"' value=''><br>");
            }
    } else if (graphType == "Bar"){
        $('#graph').css('display','none');
        $('#barChart').css('display','inline');
        for (var i = 1; i <= dataPoints; i++) {
            console.log(i);
        }
    } else if (graphType == "Scatter") {
        $('#graph').css('display','none');
        $('#scatterChart').css('display','inline');
        for (var i = 1; i <= dataPoints; i++) {
            console.log(i);
        }
    } else if (graphType == "Pie"){
        $('#graph').css('display','none');
        $('#pieChart').css('display','inline');
        for (var i = 1; i <= dataPoints; i++) {
            console.log(i);
        }
    } else {
        console.log("Error not a valid graph type");
    };

}

function makePieChart(){
var data = [1,2,3,4];

    new Contour({
        el: '#pieChart',
        pie: {
          // pie-specific configuration options
        }
    })
    .pie(data)
    .render();
}

function makeBarChart(){
    new Contour({
        el: '#barChart'})
      .cartesian()
      .horizontal()
      .bar([1,2,3,4])
      .render();
}