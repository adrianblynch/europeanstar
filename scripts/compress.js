const fs = require("fs")
const zlib = require("zlib")
const ls = require("directory-tree")
const chalk = require("chalk")

const getTree = (base, exts = "js|css|html|json") => ls("build", { extensions: new RegExp(`\.(${exts})$`) })
const getFiles = node =>
  node.children.flatMap(child =>
    child.type === "directory" ? getFiles(child) : { originalPath: child.path, originalSize: child.size }
  )
const logFiles = files => {
  files.map(file =>
    console.log(
      chalk`${file.originalPath} - {red original: ${file.originalSize}b} {blue gzip: ${
        file.gzipSize
      }b} {yellow brotli: ${file.brotliSize}b}`
    )
  )
}

const root = getTree("build")
const files = getFiles(root)

const gzip = file => {
  return new Promise(resolve => {
    const gzipPath = `${file.originalPath}.gz`

    fs.createReadStream(file.originalPath)
      .pipe(zlib.createGzip())
      .pipe(fs.createWriteStream(gzipPath))
      .on("close", () => {
        file.gzipPath = gzipPath
        file.gzipSize = fs.statSync(gzipPath).size
        resolve(file)
      })
      .on("error", () => reject(`Failed to gzip ${file.originalPath}`))
  })
}

const brotli = file => {
  return new Promise((resolve, reject) => {
    const brotliPath = `${file.originalPath}.br`

    fs.createReadStream(file.originalPath)
      .pipe(zlib.createBrotliCompress())
      .pipe(fs.createWriteStream(brotliPath))
      .on("close", () => {
        file.brotliPath = brotliPath
        file.brotliSize = fs.statSync(brotliPath).size
        resolve(file)
      })
      .on("error", () => reject(`Failed to brotli ${file.originalPath}`))
  })
}

const compressions = Promise.all(files.map(gzip)).then(files =>
  Promise.all(files.map(brotli)).then(files => logFiles(files))
)
