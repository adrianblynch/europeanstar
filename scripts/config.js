const fs = require("fs")
const dotenv = require("dotenv")

dotenv.config()

const CONFIG_ENV = process.env.CONFIG_ENV || "development"

// Inject config values
const indexFilePath = "build/index.html"
const indexFileContent = fs.readFileSync(indexFilePath, "utf8")

fs.writeFileSync(indexFilePath, indexFileContent.replace(/CONFIG_ENV="(development|staging|production)"/, `CONFIG_ENV="${CONFIG_ENV}"`))
