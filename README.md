# HTML5-Canvas-Charts

Project name: Canvas Charts

Link: http://gao00078.edumedia.ca/mad9022/pieChart/index.html


Using the HTML5 Canvas tag and Javascript, I build a web page with two charts representing the same data.

Here is the JSON data: 
{"label":"Browser Rendering Engines", "segments":[
{"value":25.8496, "label":"Gecko", "color":"hsl(50,50%,80%)"},
{"value":43.9823, "label":"Blink", "color":"hsl(100,50%,80%)"},
{"value":32.1327, "label":"Webkit", "color":"hsl(150,50%,80%)"},
{"value":13.4159, "label":"Trident", "color":"hsl(200,50%,80%)"},
{"value":3.1416, "label":"NetFront", "color":"hsl(250,50%,80%)"},
{"value":8.5664, "label":"Presto", "color":"hsl(300,50%,80%)"},
{"value":18.8641, "label":"EdgeHTML", "color":"hsl(350,50%,80%)"}
]}

The first Canvas element displays the data as a PIE Chart including labels. I used the same radius for all segments except the largest and the smallest. The largest is 120% of the standard radius and the smallest value is 80% the standard radius.

The second Canvas element displays the same data and labels in a bar chart.
