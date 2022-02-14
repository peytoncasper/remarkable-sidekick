
# Remarkable Sidekick

<p align="center">
    <img align="center" src="doc/homepage-screenshot.png" alt="example"/>
</p>

# Electron App

## Development

```
cross-env NODE_ENV=development webpack --watch --progress --color
electron ./build/main.bundle.js
```

## Build

```
cross-env NODE_ENV=production webpack && electron-builder
```
