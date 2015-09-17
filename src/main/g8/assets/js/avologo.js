//gen hsla colour
function colorMe(d) {
 var ret = "DUNNO";
 switch(d.pos) {
     case 0: 
         ret = "OUTER";
         break;
     case 1:
         ret = "MIDDLE";
         break;
     case 2:
         ret = "INNER";
         break;
     default:
         ret = "DUNNO";
         break;
 }
    return ret;
}

function colorRing(d, flipped) {
    var flip = !!flipped;
    var diff = 5;
    var hue = 152;
    var sat = 100;
    var light = 22;
    switch(colorMe(d)) {
        case "OUTER":
            hue = 141;
            sat = 41;
            light = 41;
            break;
        case "MIDDLE":
            hue = 72;
            sat = 52;
            light = 53;
            break;
        case "INNER":
            hue = 63;
            sat = 66;
            light = 50;
            break;
    }
    light = (flip)?(light - diff):light;
    light = (light < 0)?0:light;
    
    var ret = "hsl("+ hue +", "+ sat +"%, "+ light +"%)";
    return ret;
}

// size = w or h of bounding box
function scale(size) {
    var height = size + (size * 0.25);
    
    var outerdiameter = size;
    // TODO make sure can't be zero esle default
    var ringWidth = outerdiameter / 9;
    var outerR = outerdiameter / 2 - (ringWidth * 0);
    var innerR = (outerR - ringWidth);
    
    var r1OuterR = (outerdiameter / 2) - (ringWidth * 1.5);
    var r1InnerR = (r1OuterR - ringWidth);
    
    var r2OuterR = (outerdiameter / 2) - (ringWidth * 3);
    var r2InnerR = 0;
    
    
    function genArc(pos, gapRatio, flipped) {
        var flip = !!flipped;
        
        var gap = ringWidth * gapRatio
        var ratio = (ringWidth + gap) / ringWidth;
        var outerR = (outerdiameter / 2) - (ringWidth * pos * ratio);
        
        var innerR = (pos ==2 || pos == 3)? 0 : (outerR - ringWidth);
        
        var sa = Math.PI;
        var ea = (!flipped)?(2 * Math.PI):0;
        
        
        
        return {or: outerR, ir: innerR, startAngle: sa, endAngle: ea, pos: pos, flipped: flip};
    }
    
    return {
        w: size,
        h: height,
        or: outerR,
        rw: ringWidth,
        ir: innerR,
        arcData: [
            [genArc(0,0.5), genArc(0,0.5, true)],
            [genArc(1,0.5), genArc(1,0.5, true)],
            [genArc(2,0.5), genArc(2,0.5, true)]
        ]
        
    };
}

// function to draw logo
function doLogo(size, element) {
    
    console.log("in doLogo(size = " + size + ")");
    
  // logo constants
  var scaledSize = size * 1;
  var lk = scale(scaledSize);
    
  var theSVG = d3.select("body").selectAll("svg#avologo")
  .attr("width", lk.w)
  .attr("height", lk.h)
  .attr("viewBox", "0 0 370 370")
  .attr("preserveAspectRatio", "xMidYMin meet")
  
  // ---------- add fonts -------------//
  var svgStyleDef = theSVG.append("def").append("style").attr("type","text/css");

  svgStyleDef.text("@import url(http://fonts.googleapis.com/css?family=Didact+Gothic); @import url(http://fonts.googleapis.com/css?family=Montserrat);");

  //clear drawing everytime                                                     
  theSVG.selectAll("*").remove()
  
  
  //invisible font calulation stuff
  //----------------------------------
   var invisnode = theSVG.append("text").attr("x", lk.w / 2).attr("y", lk.h/2).text("M")
   .style("visibility" , "hidden")
   .attr("font-size", "1em" )
   .style("font-family", "'Didact Gothic', sans-serif")
  
//  theSVG.select("body").select("#invisitext1").node();
  
  var bbox = invisnode.node().getBBox();
  var oneCharWidth = bbox.width;
  var oneCharHeight = bbox.height; // = 1em
  var widthInEm = oneCharWidth / oneCharHeight;
    
    //one char width must be seventh of width
  var cw = scaledSize / 7
  var fsizeInEm = (cw * widthInEm) / 7 ;
  
    invisnode.remove();
  //-------------------------------------------
  
    
 
    
    //update
  var ring = theSVG.selectAll("g.ring").data(lk.arcData) //data is 2D array. each inner array has the arcs needed for full ring
  
  //enter
  var ringEnter = ring.enter().append("g")
    .attr("id", function(d, i) { return "ring" + i; })
    .attr("class", function(d,i){ return "ring ring"+i;})
    .attr("transform", function(d,i) {
        var move = ((size - scaledSize) / 2);
        return "translate("+ move  + "," + 10 +")"
    })
    
  
  
    ringEnter.attr("opacity", 0)
    .transition().delay(250).duration(1000).attr("opacity", 1)
    
    
    //exit
  var ringExit = ring.exit();
    
    
  // =============== ARCS ============
  //update
  var ringArcs = ringEnter.selectAll("path").data(function(d) { return d; }) // because data is passed a fnction we iterate on the inner array
  // enter
  var ringArcsEnter = ringArcs.enter();
  //exit
  var ringArcsExit = ringArcs.exit();
    
  ringArcsEnter.append("path")
    .attr("d", function(d,i) {
      console.log("my d for "+i+" is : "+ JSON.stringify(d));
        
      var arc = d3.svg.arc()
      .innerRadius(d.ir)
      .outerRadius(d.or)
      .startAngle(d.startAngle) //converting from degs to radians
      .endAngle(d.endAngle) //just radians

      return arc();
    })
    .attr("transform", "translate("+ lk.or +","+ lk.or +")")
    .style("stroke",  function(d) { return colorRing(d); })
//    .style("stroke-width", 0)
    .style("fill", function(d) { var ret = colorRing(d);
       return ret;
    })
    .attr("class", function(d,i) {var flip = (d.flipped)?"right":"left"; return "arc" + flip; })
    .transition()
        .delay(function(d) { return 1750;})
        .duration(2000)
    .style("fill", function(d) { var ret = colorRing(d,d.flipped);
       return ret;
    })
  
    
  //======== TEXT company name =============
  
  theSVG.append("text").attr("x", lk.w / 2).attr("y", lk.h - 4 ).text("avocado")
//  .style("font-family", "'Didact Gothic', sans-serif")
  .style("font-family", "Montserrat")
  .style("font-size", "" + 2.2 + "em" )
  .style("text-anchor", "middle")
  .style("fill", "hsla(152, 100%, 17%, 1)")
  .style("stroke", "hsla(152, 100%, 17%, 1)")
  .attr("class", "logotext")
 .attr("opacity", 0)
  
 theSVG.select("text.logotext").transition().delay(1250).duration(2000).attr("opacity", 1)
    
}


doLogo(370);
