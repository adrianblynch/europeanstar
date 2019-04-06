const Koa = require("koa")
const koaStatic = require("koa-static")
const fs = require("fs")
const dotenv = require("dotenv")
const app = new Koa()

dotenv.config()

const CONFIG_ENV = process.env.CONFIG_ENV || "development"

// Inject config values
const indexFilePath = "build/index.html"
const indexFileContent = fs.readFileSync(indexFilePath, "utf8")
fs.writeFileSync(indexFilePath, indexFileContent.replace(/CONFIG_ENV="(development|staging|production)"/, `CONFIG_ENV="${CONFIG_ENV}"`))

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

app.listen(process.env.PORT || 3001)
