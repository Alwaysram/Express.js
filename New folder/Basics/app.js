// const http=require('http');
// function rqListner(req,res){

// }
// http.createServer(rqListner);

const http=require('http');
const server =http.createServer((req,res)=>{
    console.log(req);

});
serverListen(3000);