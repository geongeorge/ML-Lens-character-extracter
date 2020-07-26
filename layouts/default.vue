<template>
  <div>
    <a-layout>
      <!-- <a-layout-header> -->
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240);"
        sub-title="handwritten മലയാളം extracter"
      >
        <template slot="title">
          <img src="/icon.png" class="main-icon" />
          ML Lens
        </template>
      </a-page-header>
      <!-- </a-layout-header> -->
      <a-layout-content style="min-height: 80vh; height: 100%;">
        <Nuxt />
      </a-layout-content>
      <a-layout-footer style="text-align: center;">shukks</a-layout-footer>
    </a-layout>
  </div>
</template>

<style>
html,
body {
  height: 100%;
}
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.main-icon {
  opacity: 0.8;
  height: 32px;
  width: auto;
}
</style>
