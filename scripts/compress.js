const fs = require("fs")
const zlib = require("zlib")
const ls = require("directory-tree")

const getTree = (base, exts = "js|css|html|json") => ls("build", { extensions: new RegExp(`\.(${exts})$`) })

const getPaths = node => node.children.flatMap(child => (child.type === "directory" ? getPaths(child) : child.path))

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

  // Available in Node > 11.13.0 - Userland brotli packages will do the trick too for lesser Nodes
  if (zlib.createBrotliCompress) {
    const compressedBrotliPath = `${path}.br`

    fs.createReadStream(path)
      .pipe(zlib.createBrotliCompress())
      .pipe(fs.createWriteStream(compressedBrotliPath))

    compressedPaths.push(compressedBrotliPath)
  }
})

logPaths("Compressed", compressedPaths)
