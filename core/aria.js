'use strict'

const { execSync } = require('child_process')
const Aria = require('aria2')
const https = require('https')

init()
const aria = new Aria()
// Open Aria2 WebSocket
aria
  .open()
  .catch(err => console.log('Aria2:', err))


function init() {
  const options = {
    hostname: 'raw.githubusercontent.com',
    port: 443,
    path: '/ngosang/trackerslist/master/trackers_best.txt',
    method: 'GET'
  }

  let trackers = ''
  const req = https.request(options, res => {
    res.setEncoding('utf8')
    res.on('data', chunk => {
      trackers += '[' + chunk.split(/\n/g).filter(String).toString() + ']'
    })
  })

  req.on('error', error => {
    console.log('problem with request: ' + error.message)
  })

  req.end()
  const cmd = `aria2c
  --enable-rpc
  --rpc-listen-all=false
  --rpc-listen-port 6800
  --max-connection-per-server=10
  --rpc-max-request-size=1024M
  --seed-time=120
  --seed-ratio=1.0
  --max-concurrent-downloads=5
  --min-split-size=10M
  --follow-torrent=mem
  --split=10
  --bt-tracker=${trackers}
  --daemon=true
  --allow-overwrite=true`
  execSync(cmd.replace(/\s+/g, ' '), {encoding: 'utf8'})
}

module.exports = {
  check_metadata: function(gid) {
    let gidNew
    const file = get_download(gid)
    gidNew = file.followedBy[0]
    return gidNew
  },
  
  get_download: function(gid) {
    const status = aria.call('tellStatus', gid).catch(err => null)
    return status
  },

  get_downloads: function(from = 0, to = 0) {
    const status = []
    aria.call('tellActive').then((data) => status.push(data))
    aria.call('tellWaiting', from, to).then((data) => status.push(data))
    aria.call('tellStopped', from, to).then((data) => status.push(data))
    return status
  },

  rawMethod: aria
}
