const serverPort=process.env.PORT||8080,
serverIP=process.env.IP||'0.0.0.0'
const xml = require('xml'),
responseData={Response:[
    {
        Gather:[{
        _attr:{
            input:"speech",
            action:"/result",
            partialResultCallback:"/partialresult"
        }        },
        {Say:"Hi Buddy"}        ]
    }
    ]}

const $ = xml(responseData, { declaration: true })
console.log(responseData,$)

const http = require('http');

const server = http.createServer((req, res) => {
  res.end();
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(serverPort,serverIP,511,function(){
    console.log("Listing on ",server.address())
})