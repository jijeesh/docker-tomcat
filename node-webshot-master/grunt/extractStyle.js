 
var system = require('system');
var page = require('webpage').create();  
var fs = require('fs');




page.onConsoleMessage = function(msg) {
    console.log('' + msg);
};

var site = system.args[1];
var w=system.args[2];
var h=system.args[3];

page.viewportSize = {
  width: w
, height: h
};


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


    phantom.exit(0);


});

function chunkString(str, length) {
  return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

/*Extract all xpath*/

function extractXpaths(page)
{
 //console.log('extractXpaths called ');

    
    var h=page.evaluate(function() {
       
      // console.log('evaluate inside '+document.body.outerHTML);

      var html =[];
      var doc = document.getElementsByTagName('*');

        for (j = 0; j < doc.length; j++) {

            var elm = doc[j];
            
           

          // html.push(getElementXPath(elm));
          var segs = [];

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

           var joined=segs.join('/');

            html.push(joined);

            //console.log('elm '+joined);



      }


      return html;

});


    return  h;
}



function extractImagePositions(page)
{


 var h=page.evaluate(function() {
       
      // console.log('evaluate inside '+document.body.outerHTML);

      var html =[];
    var doc= document.getElementsByTagName('*');
    var html = [];
    for (i = 0; i < doc.length; i++) {

         var e=doc[i];

         //console.log('element'+i);

         if(e.tagName=="IMG") {

           var styleArray = {};

             styleArray["link"]=e.getAttribute("src");


                var rectangle =[];
           var rect=e.getBoundingClientRect();
           var x = rect.left;
            var y = rect.top;
            var width = rect.right-rect.left;
            var height = rect.bottom-rect.top;
            var result = x+","+y+","+width+","+height;


              styleArray["rectangle"]=result;
  
          //  console.log('pushing image');

           html.push(styleArray);
       }
      }
         return JSON.stringify(html);

});


 return h;


}


/*Extract styles*/

function extractStyles(page)
{

//console.log('calling styles extraction');

    var h=page.evaluate(function() {
       
      // console.log('evaluate inside '+document.body.outerHTML);

      var html =[];
      var doc = document.getElementsByTagName('*');

        //console.log(doc.length);


      for (i = 0; i < doc.length; i++) {
          //var style = window.getComputedStyle(doc[i], null); 
          //var stylesheet = [];

  
             var e=doc[i];
             // console.log('element '+i);

              //CALCULATE STYLE HERE
              var styleArray = {};
              //var elementstyle =[];
         var style = window.getComputedStyle(e, null);
        styleArray["tag"]=e.tagName;
         styleArray["link"]=e.getAttribute("href");


 //          //GET RECTANGLE
         // var rectangle =[];
           var rect=e.getBoundingClientRect();
           var x = rect.left;
           var y = rect.top;
           var width = rect.right-rect.left;
           var height = rect.bottom-rect.top;
           var res_rect = x+","+y+","+width+","+height;
          styleArray["rectangle"]=res_rect;




          
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



 // //console.log(styleArray.toString());
  var childNodes = e.childNodes;
  var result_child=[];
  var flag = false;
  for (var j = 0; j < childNodes.length; j++) 
  {
    flag =true;
    result_child.push(childNodes[j].nodeValue);
    
  }
  if(!flag) {
    if("INPUT" === e.tagName) {
      var type = e.getAttribute("type");
      
      if(type != undefined && type != null &&  type != ""  )
        {
        
        if(type.indexOf("SUBMIT") > -1 || type.indexOf("BUTTON") > -1 || type.indexOf("RESET") > -1) {
        if(e.textContent.trim().length > 0) {
          result_child.push(e.textContent.trim());
        }
        }
      }
    }
  }
  





           styleArray["childNode"]=result_child.join("-,-");



       var res_text = [];
       if (style.backgroundImage != "none") {
       var out = e.textContent.split("\n");
  
          for(var k=0;k<out.length;k++) {
              if(out[k].trim() != "") {
                res_text.push(out[k].trim());
                                      }
                                      }
            }
             
             styleArray["descendantText"]=res_text.join("-,-");
             styleArray["textDecoration"]=style.textDecoration;
             styleArray["visibility"]=style.visibility; 


           if(e.tagName=="IMG") {
                styleArray["image"]=true;
            } else {
                styleArray["image"]=false;
            }
          

          //  elementstyle.push(styleArray);
           // var g=JSON.stringify(elementstyle);
            // console.log(g+'\n');



           html.push(styleArray);

           //html.push("\n");


           }

            //  console.log('end of for loop ');
     


      return JSON.stringify(html);

});



return h;


}

function extractHTML(page)
{


 var h=page.evaluate(function() {
       
      // console.log('evaluate inside '+document.body.outerHTML);

      var html =[];
    var doc= document.documentElement.innerHTML;
   
 return doc;
});
return h;
}

