const Koa = require("koa")
const static = require("koa-static")
const { default: sslify, xForwardedProtoResolver } = require("koa-sslify")
const app = new Koa()

require("./config")

const port = process.env.PORT || 3000

if (process.env.ENFORCE_HTTPS === "true") {
  app.use(sslify({ resolver: xForwardedProtoResolver }))
}

app.use(
  static("build", {
    gzip: true,
    br: true,
    maxage: 31536000000, // Cache everything...
    setHeaders: (res, path) => {
      if (path.endsWith("index.html")) {
        res.setHeader("cache-control", "max-age=0") // ... except for the index page
      }
    }
  })
)

app.listen(port, () => {
  console.log(`Listening on port ${port}:`)
})
