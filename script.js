const Jimp = require("jimp")
const http = require("http")
const fs = require("fs")
const url = require("url")
http
  .createServer((req, res) => {
    if (req.url == "/") {
      res.writeHead(200, { "Content-Type": "text/html" })
      fs.readFile("index.html", "utf8", (err, data) => {
        res.end(data)
      })
    }
    if (req.url == "/style") {
      res.writeHead(200, { "Content-Type": "text/css" })
      fs.readFile("style.css", (err, css) => {
        res.end(css)
      })
    }
    if (req.url.includes("/url_imagen")) {
      const params = url.parse(req.url, true).query
      const url_img = params.url_img
      console.log(url_img)
      Jimp.read(url_img, (err, img) => {
        img
          .resize(350, Jimp.AUTO)
          .greyscale()
          .quality(60)
          .writeAsync("newImg.jpg")
          .then(() => {
            fs.readFile("newImg.jpg", (err, Img) => {
              res.writeHead(200, { "Content-Type": "image/jpeg" })
              res.end(Img)
            })
          })
      })
    }
  })
  .listen(3000, () => console.log("Server on"))
