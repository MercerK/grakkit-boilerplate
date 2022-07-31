import { PlayerJoinEvent, PlayerQuitEvent } from 'org.bukkit.event.player'
import { command } from '@grakkit/stdlib-paper'
// You can use the existing npm modules within Minecraft
import debounce from 'lodash/debounce'
// You can import other grakkit plugins into your own as well!
import { SoundBrowser } from 'grakkit-sound-browser'
import { Bukkit } from 'org.bukkit'
import { Player } from 'org.bukkit.entity'
import { createEvent } from 'grakkit-boilerplate-util'
import { ChunkLoadEvent } from 'org.bukkit.event.world'

function initializePlayerJoin() {
  createEvent(PlayerJoinEvent, (event) => {
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
  createEvent(PlayerQuitEvent, (event) => {
    Bukkit.broadcastMessage(`${event.getPlayer().getName()} has left! Please come back soon.`)
  })
}

function initializeChunkLoad() {
  let count = 0
  const debouncedFn = debounce(() => {
    Bukkit.broadcastMessage(`${count} Chunks have been loaded.`)
    count = 0
  }, 1000)

  createEvent(ChunkLoadEvent, (event) => {
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

function sendPlayerMessage(player: Player, msg: string) {
  player.sendMessage(msg)
}
