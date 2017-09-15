/**
 * 
 */


 
var system = require('system');
var page = require('webpage').create();  
var fs = require('fs');




page.onConsoleMessage = function(msg) {
    console.log('' + msg);
};

var siteType=system.args[4];
var site = system.args[1];
var w=system.args[2];
var h=system.args[3];


page.viewportSize = {
  width: w
, height: h
};

if(siteType=='html')
{

var content=system.args[5];
var expectedContent = content;
var expectedLocation = 'http://www.phantomjs.org/';
page.setContent(expectedContent, expectedLocation);
var separator='BBETWEENN'
         var firstsep='BBEGINNINGG'
         var lastsep='EENDD'
      //console.log('Site '+site);
       var styles=extractStyles(page);
       var impos=extractImagePositions(page);
       var xpaths=extractXpaths(page);
        // data=fs.read('/tmp/helloworld.txt'); 
      
var markup = extractHTML(page);
// console.log(data);

// fs.writeFile("test",styles, function(err) {
//     if(err) {
//         return console.log('error  ggggt'+err);
//     }

//     console.log("The file was saved!");
// }); 
// var stylePiece=chunkString(styles,100);

// for (var i =0; i <stylePiece.length; i++) {
// console.log(stylePiece[i]+'\n');
// };
console.log(firstsep+'\n');
console.log(styles+'\n');
console.log(separator+'\n');
console.log(impos+'\n');
console.log(separator+'\n');
console.log(xpaths+'\n');
console.log(separator+'\n');
console.log(markup+'\n')
console.log(lastsep+'\n');


setTimeout(function(){
phantom.exit(0);
}, 0);
}else
{
page.open(site, function (status) {
    if (status !== 'success') {
        console.log('error');
    } else {
       
       var separator='BBETWEENN'
         var firstsep='BBEGINNINGG'
         var lastsep='EENDD'
      //console.log('Site '+site);
       var styles=extractStyles(page);
       var impos=extractImagePositions(page);
       var xpaths=extractXpaths(page);
        // data=fs.read('/tmp/helloworld.txt'); 
      
var markup = extractHTML(page);
// console.log(data);

// fs.writeFile("test",styles, function(err) {
//     if(err) {
//         return console.log('error  ggggt'+err);
//     }

//     console.log("The file was saved!");
// }); 
// var stylePiece=chunkString(styles,100);

// for (var i =0; i <stylePiece.length; i++) {
// console.log(stylePiece[i]+'\n');
// };
console.log(firstsep+'\n');
console.log(styles+'\n');
console.log(separator+'\n');
console.log(impos+'\n');
console.log(separator+'\n');
console.log(xpaths+'\n');
console.log(separator+'\n');
console.log(markup+'\n')
console.log(lastsep+'\n');
       //var combined=styles+separator+impos+separator+xpaths;

       // console.log(combined);
        // return impos;
    }

    setTimeout(function(){
    phantom.exit(0);
}, 0);

});
}

function chunkString(str, length) {
  return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

/*Extract all xpath*/

function extractXpaths(page)
{
 //console.log('extractXpaths called ');

    
    var h=page.evaluate(function() {var html =[];
    var doc = document.getElementsByTagName('*');
    for (j = 0; j < doc.length; j++) {
    	var elm = doc[j];
    	
    	html.push(getElementXPath(elm));
    }


    return html.join(',');




    function getElementXPath(elm) {
    	for (var segs = []; elm && elm.nodeType == 1; elm = elm.parentNode) {

    		for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) {
    			if (sib.localName == elm.localName) {
    				i++;
    			}
    		}
    		if (i == 1) {
    			segs.unshift(elm.localName.toUpperCase());
    		} else {
    			segs.unshift(elm.localName.toUpperCase() + '[' + i + ']');
    		}
    		

    	}
    	return segs.join('/');
    }});


    return  h;
}



function extractImagePositions(page)
{


 var h=page.evaluate(function() {var doc=document.getElementsByTagName('*');
 var html = [];
 for (i = 0; i < doc.length; i++) {
 	var style = window.getComputedStyle(doc[i], null); 
 	var stylesheet = [];
 	
 	if(doc[i].tagName=="IMG") {
 		html.push(getImagePosition(doc[i]));
 	}
 }
 return JSON.stringify(html);


 function getImagePosition(e) {
 	var styleArray = {};
 	if(e.tagName=="IMG") {
 		styleArray["link"]=e.getAttribute("src");
 		styleArray["rectangle"]=getRectangle(e);
 	}
 	return styleArray
 }

 function getRectangle(e) {
 	var rectangle =[];
 	var rect=e.getBoundingClientRect();
 	var x = rect.left;
 	var y = rect.top;
 	var width = rect.right-rect.left;
 	var height = rect.bottom-rect.top;
 	var result = x+","+y+","+width+","+height;
 	return result;
 }
 });


 return h;


}


/*Extract styles*/

function extractStyles(page)
{

//console.log('calling styles extraction');

    var h=page.evaluate(function() {
    	var doc=document.getElementsByTagName('*');
    	var html = [];
    	for (i = 0; i < doc.length; i++) {
    		var style = window.getComputedStyle(doc[i], null); 
    		var stylesheet = [];

    		
    		html.push(getStyle(doc[i]));
    	}




    	return JSON.stringify(html);

    	function getStyle(e) {
    		var styleArray = {};
    		var style = window.getComputedStyle(e, null);
    		styleArray["tag"]=e.tagName;
    		styleArray["link"]=e.getAttribute("href");
    		styleArray["rectangle"]=getRectangle(e);
    		styleArray["backgroundColor"]=style.backgroundColor;
    		styleArray["backgroundRepeat"]=style.backgroundRepeat;
    		styleArray["color"]=style.color;
    		styleArray["backgroundImage"]=style.backgroundImage;
    		styleArray["display"]=style.display;
    		styleArray["fontFamily"]=style.fontFamily;
    		styleArray["fontSize"]=style.fontSize;
    		styleArray["fontStyle"]=style.fontStyle;
    		styleArray["fontVariant"]=style.fontVariant;
    		styleArray["letterSpacing"]=style.letterSpacing;
    		styleArray["lineHeight"]=style.lineHeight;
    		styleArray["position"]=style.position;
    		styleArray["textAlign"]=style.textAlign;
    		styleArray["childNode"]=getChildNode(e);
    		styleArray["descendantText"]=getDescendantText(e, style);
    		styleArray["textDecoration"]=style.textDecoration;
    		styleArray["visibility"]=style.visibility;
    		styleArray["image"]=getImage(e);
    		
    		return styleArray;
    	}


    	function getRectangle(e) {
    		var rectangle =[];
    		var rect=e.getBoundingClientRect();
    		var x = rect.left;
    		var y = rect.top;
    		var width = rect.right-rect.left;
    		var height = rect.bottom-rect.top;
    		var result = x+","+y+","+width+","+height;
    		return result;
    	}

    	function getDescendantText(e, style) {
    		var results = [];
    		if (style.backgroundImage != "none") {
    		var out = e.textContent.split("\n");
    		
    			for(var i=0;i<out.length;i++) {
    				if(out[i].trim() != "") {
    					results.push(out[i].trim());
    				}
    			}
    		}
    		return results.join("-,-");
    		
    	}


    	function getChildNode(e) {
    		var childNodes = e.childNodes;
    		var result=[];
    		var flag = false;
    		for (var i = 0; i < childNodes.length; i++) {
    			flag =true;
    			result.push(childNodes[i].nodeValue);
    			
    		}
    		if(!flag) {
    			if("INPUT" === e.tagName) {
    				var type = e.getAttribute("type");
    				
    				if(type != undefined && type != null &&  type != ""  )
    					{
    					
    					if(type.indexOf("SUBMIT") > -1 || type.indexOf("BUTTON") > -1 || type.indexOf("RESET") > -1) {
    					if(e.textContent.trim().length > 0) {
    						result.push(e.textContent.trim());
    					}
    					}
    				}
    			}
    		}
    		
    		return result.join("-,-");
    	}



    	function getImage(e) {
    		if(e.tagName=="IMG") {
    			return true;
    		} else {
    			return false;
    		}
    	}
});



return h;


}

function extractHTML(page)
{


 var h=page.evaluate(function() {var markup = document.documentElement.innerHTML;
 var result = "<html>"+markup+"</html>";
 return result;
 });
return h;
}

