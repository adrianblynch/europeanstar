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

uncompressedPaths.forEach(path => {
  fs.createReadStream(path)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(`${path}.gz`))
})

const compressedTree = getTree("build", "gz")
const compressedPaths = getPaths(compressedTree)

logPaths("Compressed", compressedPaths)
