import { obePlayer } from '@grakkit/types-paper'
import { event, server, command } from '@grakkit/stdlib-paper'
// You can use the existing npm modules within Minecraft
import debounce from 'lodash/debounce'
// You can import other grakkit plugins into your own as well!
import { SoundBrowser } from 'grakkit-sound-browser'

function initializePlayerJoin() {
  event('org.bukkit.event.player.PlayerJoinEvent', (event) => {
    const player = event.getPlayer()

    sendPlayerMessage(player, 'Hello! Welcome to Grakkit Boilerplate!')

    setTimeout(() => {
      sendPlayerMessage(player, 'Enjoy your stay!')
      sendPlayerMessage(player, 'You can check out the soundBrowser by running `/soundbrowser` in chat.')
    }, 5000)

    player.getWorld().setTime(600)
  })
}

function initializePlayerQuit() {
  event('org.bukkit.event.player.PlayerQuitEvent', (event) => {
    server.broadcastMessage(`${event.getPlayer().getName()} has left! Please come back soon.`)
  })
}

function initializeChunkLoad() {
  let count = 0
  const debouncedFn = debounce(() => {
    server.broadcastMessage(`${count} Chunks have been loaded.`)
    count = 0
  }, 1000)

  event('org.bukkit.event.world.ChunkLoadEvent', (event) => {
    count++
    debouncedFn()
  })
}

export function initializeDemo() {
  // Initializes events
  initializePlayerJoin()
  initializePlayerQuit()
  initializeChunkLoad()

  // Initializes Command
  command({
    name: 'help-grakkit',
    execute: (sender) => {
      sender.sendMessage('For more information on Grakkit, checkout https://github.com/grakkit/grakkit')
    },
  })

  SoundBrowser.initialize()
}

function sendPlayerMessage(player: obePlayer, msg: string) {
  // Some typings are not a 100% match, but will allow you to work regardless.
  // In this instance, it expects "nmbacBaseComponent", but it will allow a string.
  player.sendMessage(msg as any)
}
