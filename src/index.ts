import { obePlayer } from '@grakkit/types-paper'
import { event, server, command } from '@grakkit/stdlib-paper'
import { initializeAutoReload } from 'grakkit-boilerplate-util'

function sendPlayerMessage(player: obePlayer, msg: string) {
  // Some typings are not a 100% match, but will allow you to work regardless.
  // In this instance, it expects "nmbacBaseComponent", but it will allow a string.
  player.sendMessage(msg as any)
}

event('org.bukkit.event.player.PlayerJoinEvent', (event) => {
  const player = event.getPlayer()

  sendPlayerMessage(player, 'Hello! Welcome to Grakkit Boilerplate!')

  setTimeout(() => {
    sendPlayerMessage(player, 'Enjoy your stay!')
  }, 5000)

  player.getWorld().setTime(600)
})

event('org.bukkit.event.player.PlayerQuitEvent', (event) => {
  server.broadcastMessage(`${event.getPlayer().getName()} has left! Please come back soon.`)
})

command({
  name: 'help-grakkit',
  execute: (sender) => {
    sender.sendMessage('For more information on Grakkit, checkout https://github.com/grakkit/grakkit')
  },
})

initializeAutoReload()
