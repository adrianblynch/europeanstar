const Koa = require("koa")
const koaStatic = require("koa-static")

const app = new Koa()

app.use(
  koaStatic("build", {
    gzip: true,
    br: true,
    maxage: 31536000000, // Cache everything...
    setHeaders: (res, path) => {
      if (path.endsWith("index.html")) {
        res.setHeader("cache-control", "max-age=0") // ... Except for the index page
      }
    }
  })
)

app.listen(process.env.PORT || 3000)
