import webpack from 'webpack'
import path from 'path'
import fs from 'fs'
import { clearWebpackConsole, displayWebpackMessages } from 'grakkit-boilerplate-util/dist/scripts'
import got from 'got'

function initializePaths() {
  const root = path.join(__dirname, '..', '..')

  return {
    root,
    deps: path.join(root, 'deps'),
    grakkit: path.join(root, 'server', 'plugins', 'grakkit'),
    config: path.join(root, 'webpack.config.js'),
  }
}

const paths = initializePaths()
const createConfig = require(paths.config)

function copyDependencies() {
  const files = fs.readdirSync(paths.deps).filter((f) => f.includes('.jar') || f === 'config.yml')

  files.forEach((file) => fs.copyFileSync(path.join(paths.deps, file), path.join(paths.grakkit, file)))
}

async function main() {
  const config = createConfig({ dev: true })

  copyDependencies()

  let compiler: webpack.Compiler
  try {
    compiler = webpack(config)
  } catch (err) {
    console.log(err)

    process.exit(1)
  }

  clearWebpackConsole()

  compiler.hooks.invalid.tap('invalid', () => {
    clearWebpackConsole()

    console.log('Compiling...')
  })

  compiler.hooks.done.tap('done', async (stats) => {
    clearWebpackConsole()
    displayWebpackMessages(stats)

    handleReload()
  })

  return compiler.watch({}, (stats) => {
    console.log(stats)
  })
}

async function handleReload() {
  try {
    const req = await got.get('http://localhost:4000/reload', { timeout: 1000 })
    console.log('Reload successful')

    return
  } catch (err) {
    console.log('Failed to connect...')
    return setTimeout(handleReload, 1000)
  }
}

main()
