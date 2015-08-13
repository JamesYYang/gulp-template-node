http = require("http")
handler = require("./handler/reqHandler")
config = require("./config")

server = http.createServer handler

port = port_for_argv

server.listen port

console.log "Server: #{config.name} start at #{port}..."

