const fs = require("fs")
const zlib = require("zlib")
const ls = require("directory-tree")
const flatMap = require("array.prototype.flatmap")

const getTree = (base, exts = "js|css") => ls("build", { extensions: new RegExp(`\.(${exts})$`) })

const getPaths = node => flatMap(Object.values(node.children), node => (node.type === "directory" ? getPaths(node) : node.path))

const logPaths = (label, paths) => console.log(`${label}:\n\t${paths.join("\n\t")}`)

const uncompressedTree = getTree("build")
const uncompressedPaths = getPaths(uncompressedTree)

logPaths("Compressing", uncompressedPaths)

const compressedPaths = []

uncompressedPaths.forEach(path => {

  const compressedGzipPath = `${path}.gz`

  fs.createReadStream(path)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(compressedGzipPath))

  compressedPaths.push(compressedGzipPath)

  // Available in Node > 11.13.0 - If definitely needed, userland brotli packages will do the trick too
  if (zlib.createBrotliCompress) {

    const compressedBrotliPath = `${path}.br`

    fs.createReadStream(path)
      .pipe(zlib.createBrotliCompress())
      .pipe(fs.createWriteStream(compressedBrotliPath))

    compressedPaths.push(compressedBrotliPath)
  }
})

logPaths("Compressed", compressedPaths)
