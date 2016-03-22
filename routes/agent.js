var express = require('express');
var http = require('http');
var https = require('https');
var router = express.Router();
var iconv = require('iconv-lite');

router.get('/', (req, res)=> {
    console.log(req.query);
    if (req.query.potocol === "http") {
        httpRequest(req.query, res);
    }
    else if (req.query.potocol === "https") {
        httpsRequest(req.query, res);
    }
    else {
        console.log("Protocol Error: Neither http nor https~");
        res.send("protocol Error");
    }


});
/**
 * http get Request
 * @query [protocol, site]
 * @res express.router.res
 */
var httpRequest = (query, res)=>{
    var htmlString = "";
    http.get(query.potocol + "://" + query.site, (html)=> {
        html.on('data', (chunk)=> {
            htmlString += chunk;
        }).on('end', ()=>{
            
            res.send(injectScript(htmlString));
        });
    }).on('error', (err)=> {
        console.log(err);
    });
};

var httpsRequest = (query, res) => {
    var htmlString = "";
    https.get(query.potocol + "://" + query.site, (html)=> {
        console.log(html);
        html.on('data', (chunk)=> {
            htmlString += chunk;
        }).on('end', ()=>{
            res.send(injectScript(htmlString));
        });
    }).on('error', (err)=> {
        console.log(err);
    });
};

/**
 * [inject javascript into html string]
 * @param  {[String]} html [html before inject]
 * @return {[String]}      [html after inject]
 */
var injectScript = (html)=> {
    return html.split('</body>')[0]
    + "<script src='/javascripts/inject.js'></script>"
    + "</body>"
    + html.split('</body>')[1];
};


module.exports = router;