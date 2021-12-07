const fs = require('fs');
const clc = require('cli-color')
http = require('http'),
https = require('https');

//npm install fs cli-color http https stream
  
var Stream = require('stream').Transform;
const { throws } = require('assert/strict');
  
var Download = (url, filename, callback) => {
  
    var client = http;

    if (url.toString().indexOf("https") === 0){

      client = https;

     }
  
    client.request(url, function(response) { 

      var data = new Stream();                                                    
  
      response.on('data', function(chunk) {  

         data.push(chunk);           

      });                                                                         
  
      response.on('end', function() {      

         fs.writeFileSync(filename, data.read());  

      });          

   }).end();

};

console.clear()

    var dir = 'person';


function start() {
    fs.rm(dir, { recursive: true}, err => {
        if(err) {
            throw err;

        }

        fs.mkdir(dir, { recursive: true}, err => {

            if(err) {
                throw err;
            }

            
            var i = 0;

    while(i < 1) {
        function timeoutFunc() {

            console.log(clc.redBright(`[`), clc.whiteBright(` + `), clc.redBright(`] `), clc.whiteBright(`- person-${i+1}.png`))
            Download('https://thispersondoesnotexist.com/image', `./person/person-${i+1}.png`)
            i++
            setTimeout(timeoutFunc, 1500);
        }
        timeoutFunc();
    }

        })

    })

}

    if(fs.existsSync(dir)) {

        start();

    } else {

        fs.mkdir(dir, { recursive: true}, err => {

            if(err) {
                
                throw err;

            }

            start();

        })

    }


