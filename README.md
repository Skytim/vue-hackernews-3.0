# vue-hackernews-3.0

HackerNews clone built with Vue 3.0 + vue-router + vuex, with server-side rendering.

<p align="center">
  <a href="https://skytim.github.io/vue-hackernews-3.0" target="_blank">
    <img src="https://user-images.githubusercontent.com/7261694/115118073-23f3de80-9fd4-11eb-9021-b1ba09a44205.png" width="700px">
    <br>
    Live Demo
  </a>
</p>

## Features

> Note: in practice, it is unnecessary to code-split for an app of this size (where each async chunk is only a few kilobytes), nor is it optimal to extract an extra CSS file (which is only 1kb) -- they are used simply because this is a demo app showcasing all the supported features.

- Progressive Web App
  - App manifest
  - Service worker
  - 100/100 Lighthouse score
- Single-file Vue Components
  - Hot-reload in development
  - CSS extraction for production
- Animation
  - Effects when switching route views
  - Real-time list updates with FLIP Animation


## Build Setup

**Requires Node.js 7+**

``` bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at localhost:8080
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```

## License

MIT