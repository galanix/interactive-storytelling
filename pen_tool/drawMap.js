$(document).ready(function() {
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */


    var a = document.getElementById('map');
    var map_url = JSON.parse(localStorage.getItem('map'));
    $('#map').attr('data', map_url);
    a.addEventListener("load", function() {
        var svgDoc = a.contentDocument;
        var svgRoot = svgDoc.documentElement;
        var PathDirection = JSON.parse(localStorage.getItem('path'));


        console.log(svgRoot);

        if (PathDirection) {
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

            $(path).attr('d', PathDirection);
            $(path).attr('fill', 'transparent');
            $(path).attr('stroke', '#000');

            // console.log(path);
        }

        Snap.plugin(function(Snap, Element, Paper, global) {
            Paper.prototype.circlePath = function(cx, cy, r) {
                var p = "M" + cx + "," + cy;
                p += "m" + -r + ",0";
                p += "a" + r + "," + r + " 0 1,0 " + (r * 2) + ",0";
                p += "a" + r + "," + r + " 0 1,0 " + -(r * 2) + ",0";
                return this.path(p, cx, cy);

            };
        });
        var pathGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        pathGroup.id = "pathGroup";
        pathGroup.append(path);
        svgRoot.append(pathGroup);
        var s = Snap(pathGroup);

       
        var circlesArray = JSON.parse(localStorage.getItem('circlesCoords'));
			  var pointsArray = [];
				var stringArr = '';


//  Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white 


      $.each(circlesArray, function(index, el) {
      	var pointsObj = {
        	cx: 0,
        	cy: 0,
        	r: 1
        };    

        var circle = s.circlePath(this.cx, this.cy, this.r).attr({
            fill: "#000",
            stroke: "#a7470c",
            id: index
            // onclick: "openNav();"
        });

        var intersects = Snap.path.intersection(circle, $(path).attr('d'));
        		console.log(intersects);
            pointsObj.cx = intersects[0].x;
            pointsObj.cy = intersects[0].y;

            pointsArray.push(pointsObj);
						// console.log(pointsArray);
						// circlesOnPage.push(circle);
            intersects.forEach(function(el) {

                s.circle(el.x, el.y, 1);       
                
            });
            // console.log(pointsArray);
					localStorage.setItem('points', JSON.stringify(pointsArray));
        });	



// console.log(circlesArray);
// var clickFunc = function(){
// 	alert("YO");
// };
// 	console.log();
// 	$.each(circlesOnPage, function(i,el){

// 		$(el).click(clickFunc);
// 	});
		// var circlesOnPage = [];
		if (localStorage.getItem('PointsContent') != null) {
		    var pointsDataContentArray = JSON.parse(localStorage.getItem('PointsContent'));
		} else {
		    var pointsDataContentArray = [];
		}
		for (var i = 0; i < circlesArray.length; i++) {
		    var paths = svgDoc.getElementById(i);
		    // paths[i].attr("data","alert(1)");
		    
		    paths.style.cursor = "pointer";
		    $(paths).mouseenter(function(){
		    	$(this).css("fill", "#000");
		    	$(this).css("transition", "0.5s");
		    	$(this).css("stroke-width", "4px");
		    	$(this).css("stroke","#000000");


		    }).mouseout(function(){
		    	$(this).css('fill', "#000");
		    	$(this).css("transition", "0.5s");
		    	$(this).css("stroke-width", "1px");
		    	$(this).css("stroke","rgb(167,71,12)");
		    });
		  
		    paths.addEventListener("click", function() {

		        var Npoint = parseInt(this.id) + 1;
		        // if(getPointData[].pointId){
		        // 	editor.
		        // }
		        console.log(Npoint);
		        if (localStorage.getItem('PointsContent') != null) {
		            var getPointData = JSON.parse(localStorage.getItem('PointsContent'));
		          	console.log(getPointData);
		          	var PointLastData;
		            for (var j = 0; j < getPointData.length; j++) {
		            	
		                var count = getPointData[j].pointId == Npoint;

		                console.log(count);
		                if (count) {
		                    // editor.setData(getPointData[j].data);
		                    PointLastData = getPointData[j].data;
		                    console.log(PointLastData);
		                }
		          }
		          editor.setData(PointLastData);
		        }
		        openNav(Npoint);
		        document.getElementById("SavePointContent").onclick = function() {
		            var pointsDataContent = {
		                pointId: 0,
		                data: ""
		            };

		            pointsDataContent.pointId = Npoint;

		            pointsDataContent.data = editor.getData();
		            pointsDataContentArray.push(pointsDataContent);
		            localStorage.setItem('PointsContent', JSON.stringify(pointsDataContentArray));
		            console.log(pointsDataContentArray);
		            $("#userNotification").fadeIn(200);
		        };
		    });
		}
			// console.log(circlesOnPage);
			// $.each(circlesOnPage, function(el){
			// 	$(this).on("click", function(){
			// 		alert(1);
			// 	});
			// });





 			var pathLength = path.getTotalLength();
        console.log(pathLength);
        var stopsAtLength = [];

        for(var i=0;i<pathLength;i++){
        	var pathLengthAtPoint = path.getPointAtLength(i);
        	// console.log(pathLengthAtPoint);
        	var pointX = pathLengthAtPoint.x;
        	var pointY = pathLengthAtPoint.y;

        	// console.log(pointsArray[i].cy);
        	for(var j=0;j<pointsArray.length;j++){
        	// var resultX = Math.round(pointX) - Math.round(pointsArray[j].cx);
        	// var resultY = Math.round(pointY) - Math.round(pointsArray[j].cy);
        	// (Math.ceil(pointX) == Math.ceil(pointsArray[j].cx)  && Math.floor(pointY) == Math.floor(pointsArray[j].cy)) && 
        	  if( Math.round(pointX) == Math.round(pointsArray[j].cx)  && Math.round(pointY) == Math.round(pointsArray[j].cy)){
        	  	
        			console.log('['+Math.round(pointX),Math.round(pointsArray[j].cx)+'], '+'['+Math.round(pointY), Math.round(pointsArray[j].cy)+']');
        			stopsAtLength.push(i);
        			
        		}
// 1 погрешность в том, что иногда одна точка может быть записана 2 раза и длина отрезка у 1 точки будет n , а у 2 n+1
        	}

// (2>resultX >-2)  &&  (2>resultY>-2)

					localStorage.setItem("stopsAtLength", JSON.stringify(stopsAtLength));
					
        	// $(circleTest).attr("cx",path.getPointAtLength(i).x);
        	// $(circleTest).attr("cy", path.getPointAtLength(i).y);
        	// $(circleTest).attr('r', "1");
        	// $(circleTest).attr("fill", "green");
        	// $(circleTest).attr('stroke', "#000");
        	// svgRoot.append(circleTest);
        }
        		if(pointsArray.length !== stopsAtLength.length){
        			console.log("HERE IS THE DIFFERENCE: 1st array length = " + pointsArray.length + ', 2nd arr length= '+ stopsAtLength.length+""  );
        		}
        		else{
        			console.log('no DIFFERENCE between arr lengths');
        		}
        console.log(stopsAtLength);










        // var result = [];
        // var subPathsCommonLength = 0;
        // var string = '';
        // string += ($(path).attr("d"));
        // var arr = string.split("T");


        // console.log(path.getTotalLength());

        // for (var i = 1; i < arr.length; i++) {
        //     arr[i] = "M" + arr[i];
        //     arr[i] += "T";

        // }
        // arr[0] += "T";

        // for (var i = 0; i < arr.length; i++) {
        //     var newPath = arr[i];
        //     // console.log(newPath);
        //     var SeparatePaths = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        //     $(SeparatePaths).attr('d', newPath);
        //     $(SeparatePaths).attr('fill', "none");
        //     $(SeparatePaths).attr('stroke', "#000");
        //     pathGroup.append(SeparatePaths);
        //     svgRoot.append(pathGroup);
        //     result.push(SeparatePaths.getTotalLength());
        //     subPathsCommonLength += SeparatePaths.getTotalLength();

        // }


    }, false);


    var WrapperProps = JSON.parse(localStorage.getItem('mapStyleProperties'));
    console.log(WrapperProps);
    $.each(WrapperProps, function(prop, value) {
        $(".mapbg").css(prop, value);
    });
});