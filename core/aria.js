const { execSync } = require('child_process')
const https = require('https')

/**
 * Initialize aria2c daemon
 */
module.exports = {
  init: () => {
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
        const cmd = 'aria2c \
        --enable-rpc \
        --rpc-listen-all=false \
        --rpc-listen-port 6800 \
        --max-connection-per-server=10 \
        --rpc-max-request-size=1024M \
        --seed-time=120 \
        --seed-ratio=1.0 \
        --max-concurrent-downloads=5 \
        --min-split-size=10M \
        --follow-torrent=mem \
        --split=10 \
        --bt-tracker=${trackers} \
        --daemon=true \
        --allow-overwrite=true'
        execSync(cmd, {encoding: 'utf8'})
      })
    })

    req.on('error', error => {
      console.log('problem with request: ' + error.message)
    })

    req.end()
  }
}
