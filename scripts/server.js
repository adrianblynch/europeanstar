const Koa = require("koa")
const static = require("koa-static")
const sslify = require("koa-sslify")
const app = new Koa()

require("./config")

if (process.env.ENFORCE_HTTPS === "true") {
  app.use(sslify({ trustProtoHeader: true }))
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

app.listen(process.env.PORT || 3001)
