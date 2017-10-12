//set global vars for canvas and context
var total = 0;
var canvas, context;
var canvas2, context2;

document.addEventListener("DOMContentLoaded", function () {
   //First method to load the file --- Part1, need to call gotData function in this method
    //dynamically creating Script tag --- <script>
//    var s = document.createElement("script");
//    s.addEventListener("load", gotData); //automatically load
//    s.src = "browsers.js";
//    document.body.appendChild(s);


    //Second method to load the file via AJAX call 
    fetch("./browsers.json")
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            // now we can use "data", let us do something with it
           console.log("haha");
            showPieChart(data);
            showBar(data);
        }).catch(function (err) {
            alert(err.message);
        });




    //global vars for canvas and context
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");

    canvas2 = document.querySelector("#myCanvas2");
    context2 = canvas2.getContext("2d");
});

//First method to load the file --- Part2
//function gotData() {
//    //now we can use "data"
//    showPieChart(data);
//    showBar(data);
//};

function showBar(data) {
    console.log("enter bar chart");
    console.dir(total);
    //set default styles for canvas
    context2.strokeStyle = "#333"; //colour of the lines
    context2.lineWidth = 3;
    context2.font = "bold 8pt Arial";
    //  context2.fillStyle = "#900";	//colour of the text
    context2.textAlign = "center";




    //the percentage of each value will be used to determine the height of the bars.
    var graphHeight = 300; // bottom edge of the graph
    var offsetX = 20; // space away from left edge of canvas to start drawing
    var barWidth = 30; // width of each bar 
    var spaceBetweenBars = 20; // how far apart to make each x value

    var x = offsetX + 20; // left edge of first rectangle
    //start a new path
    //    context2.beginPath();
    for (var i = 0; i < data.segments.length; i++) {

        context2.beginPath();

        context2.fillStyle = data.segments[i].color;
        var pct = data.segments[i].value / total;
        console.log(pct);
        var barHeight = graphHeight * pct * 2; // emplifer the bars 
        context2.rect(x, graphHeight - 1, barWidth, -1 * barHeight);
        //for the first point the moveTo and lineTo values are the same
        //all the labels for the bars are going above the bars
        context2.fillText(data.segments[i].label, x + 15, graphHeight - barHeight - 18 - 1);


        context2.stroke(); //draw lines around bars
        context2.fill(); //fill colours inside the bars

        // move the x value to the next point--- left bottom corner of the rectagle
        x += barWidth + spaceBetweenBars;
    }
    // start to draw the graph edges
    context2.strokeStyle = "#999";
    context2.lineWidth = 1;
    context2.beginPath();
    context2.moveTo(offsetX, canvas2.height - graphHeight - 30);
    context2.lineTo(offsetX, graphHeight);
    context2.lineTo(canvas2.width - offsetX + 10, graphHeight);
    context2.stroke();

}



function showPieChart(data) {
    var lenSegs = data.segments.length;
    // get the totoal of the values
    // find the indexs for the max and min segments
    var minIndex = -1;
    var minValue = 1000;
    var maxIndex = -1;
    var maxValue = -1;

    for (var i = 0; i < lenSegs; i++) {

        if (data.segments[i].value < minValue) {
            minValue = data.segments[i].value;
            minIndex = i;
        }
        if (data.segments[i].value > maxValue) {
            maxValue = data.segments[i].value;
            maxIndex = i;
        }

        total += data.segments[i].value;
    }

    var cx = canvas.width / 2;
    var cy = canvas.height / 2;
    var radius = 100;
    var currentAngle = 0;
    var fontString = "bold 26pt Arial";

    for (var i = 0; i < lenSegs; i++) {
        var pct = data.segments[i].value / total;
        var colour = data.segments[i].color;
        //        console.log(pct);

        //draw the arc
        var endAngle = currentAngle + (pct * (Math.PI * 2));
        context.moveTo(cx, cy);
        context.beginPath();
        context.fillStyle = colour;

        if (minIndex == i) {
            context.arc(cx, cy, radius * 0.8, currentAngle, endAngle, false);
        } else if (maxIndex == i) {
            context.arc(cx, cy, radius * 1.2, currentAngle, endAngle, false);
        } else {
            context.arc(cx, cy, radius, currentAngle, endAngle, false);

        }
        context.lineTo(cx, cy);
        context.fill();

        //Now draw the lines that will point to the values
        context.save();
        context.translate(cx, cy); // make the middle of the circle the (0,0) point
        context.strokeStyle = "#0CF";
        context.lineWidth = 1;
        context.beginPath();
        //angle to be used for the lines
        var midAngle = (currentAngle + endAngle) / 2; // middle of the two angles
        context.moveTo(0, 0); // this value is the start at the middle of the circle
        //to start further out... actual starting points for the lines
        //moving the drawing point offset away from the middle of the circile
        var dx = Math.cos(midAngle) * (0.7 * radius);
        var dy = Math.sin(midAngle) * (0.7 * radius);
        context.moveTo(dx, dy);
        //ending points for the lines
        var dx = Math.cos(midAngle) * (radius + 30); // 30px beyond radius
        var dy = Math.sin(midAngle) * (radius + 30);
        context.lineTo(dx, dy);

        //adjusting the label postions
        if (i < 2) {
            dx += -14;
            dy += 8;
        } else {
            dx += -16;
            dy += -3;
        }

        context.fillText(data.segments[i].label, dx, dy);
        context.stroke();
        //put the canvas back to the original position (both coordinates and ratation postion)
        context.restore();
        //update the currentAngle
        currentAngle = endAngle;
    }

}




//From jake
//function getData() {
//    fetch("browsers.json")
//        .then(function (response) {
//            return response.json();
//        })
//        .then(function (datas) {
//            console.trace(datas);
//            // Assign data;
//            browserData = datas.segments;
//            drawChart();
//        })
//        .then(function () {
//
//            drawOther();
//        })
//}

//
//
//function showBarChart(data) {
//    console.log("enter bar chart");
//    console.log(total);
//    var startY = 20;
//    var height = 30;
//    var gap = 20;
//    //max width for the var is chart width less a gap on either side
//    var chartW = 400 - (gap * 2);
//    var currentY = startY;
//
//    var chart = document.querySelector('.canvas3');
//
//
//    var lenSegs = data.segments.length;
//    console.log(lenSegs);
//
//    for (var i = 0; i < lenSegs; i++) {
//
//        console.log("here");
//        console.log(data.segments[i].value);
//
//        var bar = document.createElement("div");
//        bar.classList.add("bar");
//        //        bar.className("bar");
//        bar.style.top = currentY + "px";
//        chart.appendChild(bar);
//
//        //delay the setting of the width by 16ms to trigger the animations
//
//        //        setTimeout((function(b,n){
//        //            return function(){
//        //                b.style.width = ((data.segments[i].value)/total * chartW) + "px";
//        //            }
//        //        })(bar, i), 250*i+1);
//
//        bar.style.width = ((data.segments[i].value) / total * chartW) + "px";
//
//        console.log(bar.style.width);
//        currentY += height + gap;
//    }
//
//    //    console.log(chartW);
//}