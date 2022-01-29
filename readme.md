# Grakkit Boilerplate

> Useful boilerplate for creating stuff with [Grakkit](https://github.com/grakkit/grakkit)

Grakkit is a Minecraft Server Plugin utilizing the GraalVM JavaScript Engine. This repository is a boilerplate
implementation to quickly spawn up a workspace to get started using Babel, Webpack, and TypeScript.

# How It Works

## Development Mode `npm run start`

1. This uses a webserver within the minecraft server.
2. When in development mode, it enables a new API route called `/reload`.
3. The solution is built using webpack (which is _fast_) and it will put the compiled files in
   `server/plugins/grakkit/dist`.
4. Using a custom start up script in `scripts/start/index.ts`, it will build the solution, enable development mode, and
   ping the `/reload` endpoint.
   - Once the endpoint is hit, well, the server reloads grakkit.

## Production Mode `npm run build`

1. Using webpack, it'll build the files to `/dist`. Any code relying on `development` will be disabled.

# Initial Configuration

1. Run `yarn install` (or change over to `npm install`)
2. Place your server jar in the `server` folder (such as paper.jar).
3. Add the grakkit jar in the `/server/plugins` folder.
4. Run `yarn start` / `npm run start` first to sync files.
5. Run `yarn start:server` to start mc server

- You may need to tweak the startup to your configuration.

# Startup

1. Run `yarn start`
2. Run `yarn start:server`

# Info

## Deps Folder

When developing plugins, you may need to hook into additional dependencies. You can add those jars to the `./deps`
folder. If you need further customization, you can update `scripts/start/index.ts`

## Startup Script

The startup script is forked from Create-React-App's WebpackDevServer. It _works_, but isn't perfect.
