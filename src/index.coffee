http = require("http")
handler = require("./handler/reqHandler")
config = require("./config")

server = http.createServer handler

server.listen config.port

console.log "Service start at #{config.port}..."

