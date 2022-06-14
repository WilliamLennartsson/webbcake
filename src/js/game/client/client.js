const socketUrl = "ws://localhost:5000/"

const initConfig = {
  // Hooks
  onCreate: null,
  onDisconnect: null,
  onUpdate: null,
  onPlayerJoined: null,
  onPlayerLeft: null,
}
export default class Client {
  constructor(conf) {
    // Socket
    this.socket = new WebSocket(socketUrl)
    // Config
    const config = Object.assign(initConfig, conf)
    this.onCreate = config.onCreate
    this.onDisconnect = this.onDisconnect
    this.onUpdate = this.onUpdate
    this.onPlayerJoined = this.onPlayerJoined
    this.onPlayerLeft = this.onPlayerLeft
  }
  init = () => {
    this.socket.onopen = function (e) {
      // console.log("[open] Connection established")
      // console.log("Sending to server")
      this.socket.send(JSON.stringify({ status: 1, player }))
    }
    this.socket.onmessage = function (event) {
      // console.log('event. :>> ', event.data)
      const parsedData = JSON.parse(event.data)
      // console.log("Players??")
      // console.log(parsedData)
      switch (parsedData.status) {
        case 1:
          const newPlayer = parsedData.player
          console.log('OnMessage: newPlayer added :>> ', newPlayer)
          break
        case 2:
          console.log("OnMessage: Server update")
          console.log(parsedData.players)
          break
        case 3:
          console.log("OnMessage: Inform")
          console.log(parsedData)
          break
      }
    }
    this.socket.onclose = function (event) {
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`)
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log("Connection died")
      }
    }
    this.socket.onerror = function (error) {
      console.log(`[error] ${error.message}`)
    }
  }
  connect = () => {

  }
}

