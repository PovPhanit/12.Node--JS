
const fs=require('fs');
const crypto=require("crypto");
const start=Date.now();
process.env.UV_THREADPOOL_SIZE=3;
setTimeout(()=>{
    console.log("timer 1 finished")
},0)
setImmediate(()=>{
    console.log("Immediate 1 finished")
})

fs.readFile('test-file.txt',()=>{
    console.log("I/O finished");
    console.log('-------------');

    setTimeout(()=>{
        console.log("timer 2 finished")
    },0)
    setTimeout(()=>{
        console.log("timer 3 finished")
    },3000)
    setImmediate(()=>{
        console.log("Immediate 2 finished")
    })
    process.nextTick(()=> console.log("Process.nextTick"));
    crypto.pbkdf2('password','salt',100000,1024,'sha512',()=>{
        console.log(Date.now()-start," Password encrypted");
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512',()=>{
        console.log(Date.now()-start," Password encrypted");
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512',()=>{
        console.log(Date.now()-start," Password encrypted");
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512',()=>{
        console.log(Date.now()-start," Password encrypted");
    })
})

console.log("Hello from the top-level code");


// =======================Require==============================
//require('fs') : for read and write file
// require('crypto') : for crypto
// require('http') : for request server
// require('url')  : url from htpp

// =========================================
// REQUIREfs.readFileSync(nameFile,'utf-8');  : for read file  (Txt,json,HTML,...)
// REQUIREfs.writeFileSync(nameFile,text)  : for write file
// REQUIREfs.readFile(nameFile,'utf-8',(err,data)=>{}) : for read file in none-blocking

// ==================Server=======================
// REQUIREhttp.createServer((req,res)=>{
    //res.end('user put')
    //req.url : for url from http
    //res.writeHead(status,{optionObj}); : for writeHead in API
// }) : for create server
// vari.listen(port,'IP',()=>{}) : open server by IP
// {%html%} : for html 

// ======================================
// process.nextTick(()=>{}); : execute first 
// setImmediate(()=>{}) : execute after process.nextTick (when read file)
// crypto.pbkdf2('password','salt',100000,1024,'sha512',()=>{}) : 

// ====================Events==========================
// REQUIREevents.emit('name',value) : for events
// REQUIREevents.on('name',()=>{}) : for execute events

// ====================Export============================
// module.exports=exp : for export  (like export default)
// exports.nameFC=()=>{} : for export (like export)
// require('pathFile')(); : for output from module.exports 




// ======================stream==========================
// const readable=fs.createReadStream('test-file.txt');
        // readable.on('data',chunk=>{
        //     res.write(chunk);
        // })
        // readable.on('end',()=>{
        //     res.end();
        // })
        // readable.on('error',err=>{
        //     res.statusCode=500;
        //     res.end("File not found");
        // })

        // const readable=fs.createReadStream('test-file.txt');
        // readable.pipe(res);