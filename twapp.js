const serverPort = process.env.PORT || 8080,
    serverIP = process.env.IP || '0.0.0.0'
const querystring = require('querystring'),
    xml = require('xml'),
    callJSON = {
        Response: [{
            Gather: [{
                _attr: {
                    input: "speech",
                    action: "/result",
                    partialResultCallback: "/partialresult"
                }
            }, {
                Say: "Hi Buddy"
            }]
        }]
    },
    resultJSON = {
        Say: "Hi Buddy Result"
    },
    pResultJSON = {
        Say: "Hi Buddy Pee Pee Pee result"
    }

const callXML = xml(callJSON, {
        declaration: true
    }),
    resultXML = xml(resultJSON, {
        declaration: true
    }),
    pResultXML = xml(pResultJSON, {
        declaration: true
    })

const http = require('http');

const server = http.createServer((req, res) => {
    var body = "",
        bodyJson = {}
    req.on('data', (chunk) => {
        body += chunk
    });
    req.on('end', () => {
        bodyJson = querystring.parse(body)
        console.log('Body', bodyJson)

        .setHeader('Content-Type', 'application/xml')

        switch (req.url) {
            case "/":
                console.log(req.method, req.url)
                res.end(req.method + req.url + JSON.stringify(req.headers))
                break
            case "/call":
                console.log(req.method, req.url, "Sending:", callXML)
                res.statusCode = 200
                res.end(callXML)
                break
            case "/result":
                console.log(req.method, req.url, "Sending:", resultXML)
                res.statusCode = 200
                res.end(resultXML)
                break
            case "/partialresult":
                console.log(req.method, req.url, "Sending:", pResultXML)
                res.statusCode = 200
                res.end(pResultXML)
                break
            default:
                res.statusCode = 404
                res.end(req.method + req.url)
                console.log(req.method, req.url, req.headers["referer"])
        }
    })
})
server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(serverPort, serverIP, 511, function() {
    console.log("Listening on ", server.address())
})
