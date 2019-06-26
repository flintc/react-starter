// // var http = require('http'),
// //   httpProxy = require('http-proxy');
// // //
// // // Create your proxy server and set the target in the options.
// // //
// // httpProxy.createProxyServer({ target: 'http://localhost:9000' }).listen(8000); // See (†)




// const { createServer } = require('http');
// const { createProxyServer } = require('http-proxy');
// const Path = require('path');
// const Bundler = require('parcel-bundler');



// // Create your target server
// //
// createServer(function (req, res) {
//   //res.writeHead(200, { 'Content-Type': 'text/plain' });
//   //res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
//   res.writeHead(200, { 'Content-Type': 'text/json' })
//   res.write(JSON.stringify({ result: true }))
//   res.end();
// }).listen(9000);


// const backEnd = {
//   protocol: 'http',
//   host: 'localhost',
//   port: 9000
// };

// const parcelEnd = {
//   protocol: 'http',
//   host: 'localhost',
//   port: 1234
// };

// // parcel options, such as publicUrl, watch, sourceMaps... none of which are needed for this proxy server configuration
// const options = {};

// // point parcel at its "input"
// const entryFiles = Path.join(__dirname, 'src', 'index.html');

// // init the bundler
// const bundler = new Bundler(entryFiles, options);

// bundler.serve();

// // create a proxy server instance
// const proxy = createProxyServer();

// // serve
// const server = createServer((req, res) => {
//   if (req.url.includes('/api/')) {
//     console.log('\n\n HERE \n\n')
//     proxy.web(req, res, {
//       // back-end server, local tomcat or otherwise
//       target: backEnd,
//       changeOrigin: true,
//       //autoRewrite: true
//     });
//   } else {
//     console.log('\n\n no here \n\n')
//     // parcel's dev server
//     proxy.web(req, res, {
//       target: parcelEnd,
//       ws: true
//     });
//   }
// })

const proxy = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')
const express = require('express')
const { createServer } = require('http');

//
// Create your target server
//
createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/json' })
  res.write(JSON.stringify({ result: true }))
  res.end();
}).listen(9000);

let bundler = new Bundler('src/index.html')
let app = express()

app.use(
  '/api',
  proxy({
    target: 'http://localhost:9000'
  })
)

app.use(bundler.middleware())

app.listen(Number(process.env.PORT || 1235))