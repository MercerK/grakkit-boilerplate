import '@grakkit/stdlib-paper'
import { priority } from '@grakkit/stdlib-paper'
import { CommandSender } from 'org.bukkit.command'

// Overrides stdlib-paper types to support the node_module types.
declare module '@grakkit/stdlib-paper' {
  export function command(options: {
    name: string
    message?: string
    aliases?: string[]
    execute?: (sender: CommandSender, ...args: string[]) => void
    namespace?: string
    permission?: string
    tabComplete?: (sender: CommandSender, ...args: string[]) => string[]
  })
}
