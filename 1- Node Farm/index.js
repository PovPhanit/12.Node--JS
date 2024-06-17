// npm init , npm install slugify 
// npm install nodemon --save-dev
// npm i nodemon --global
const fs = require("fs");
const slugify=require('slugify');
const replaceTemplate=require('./modules/replaceTemplate');
//blocking
// const textIN=fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIN);
// const textOut=`This is what we know about avocado : ${textIN}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('File Written!');

//non-blocking
// fs.readFile('./txt/start.txt','utf-8',(err,data)=>{
//     console.log(data);
// })
// console.log('will read file');
///////////////////////////////////////
//server
const url = require("url");
const htpp = require("http");
const tempOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");
const data=fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);


const slugs=productData.map(el=>slugify(el.productName,{lower:true}));
console.log(slugs);

const server = htpp
  .createServer((req, res) => {
    // const pathname = req.url;
    // console.log(pathname);
    //overview page
    console.log(req.url);
    console.log(url.parse(req.url,true));
    const {query,pathname}=url.parse(req.url,true);
    console.log(query,pathname);
    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200, { "Content-type": "text/html" });
        // res.end(tempOverview);
        const cardHtml=productData.map(el=>replaceTemplate(tempCard,el));
        // console.log(cardHtml);
        const output=tempOverview.replace('{%PRODUCT_CARDS%}',cardHtml);
        res.end(output);
    }
    //product page 
    else if (pathname === "/product") {
      // res.end("This is the product");
      res.writeHead(200, { "Content-type": "text/html" });
      const product=productData[query.id];
      const output=replaceTemplate(tempProduct,product);
      res.end(output);
    } 
    //API
    else if (pathname === "/api") {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(data);
    } 
    //Not Found
    else {
      res.writeHead(404, {
        "Content-type": "text/html",
        "my-own-header": "hello-w",
      });
      res.end("<h1>Page not found</h1>");
    }
  })
  .listen(8000, "127.0.0.1", () => {
    console.log("Listenning to requests on port 8000");
  });




  //require('fs') : for read and write file
// vari.readFileSync(nameFile,'utf-8');  : for read file  (Txt,json,HTML,...)
// vari.writeFileSync(nameFile,text)  : for write file
// fs.readFile(nameFile,'utf-8',(err,data)=>{}) : for read file in none-blocking

//server
// require('http') : for request server
// require('url')  : url from htpp
// variHTTP.createServer((req,res)=>{}) : for create server
//res.end('user put')
//req.url : for url from http
//res.writeHead(status,{optionObj}); : for writeHead in API
// vari.listen(port,'IP',()=>{}) : open server by IP
// {%html%} : for html 