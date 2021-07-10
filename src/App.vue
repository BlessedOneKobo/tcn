<template>
  <div id="app">
    <div class="site-banner">
      <div class="logo">
        <img src="@/assets/logo.png" width="129" height="120" />
      </div>
      <h1 class="banner-text">network monitoring automation system</h1>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss" src="@/sass/style.scss"></style>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");

:root {
  --sm-margin-y: 2em;
  --padding-y: 1.5em;
  --dark-blue: #778495;
}
body {
  background-color: #c8d5e1;
  font-family: "Nunito", sans-serif !important;
  margin: 0;
  padding: 0;
}
#grid-container {
  position: absolute;
  margin-top: 100px;
}
.site-banner {
  padding: var(--padding-y) 0.25em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.site-banner .banner-text {
  text-align: center;
  font-weight: bold;
  letter-spacing: 0.05em;
  font-size: 1.75em;
  text-transform: uppercase;
}
button {
  padding: 0.75em;
  border-radius: 25px;
  border: none;
  box-shadow: 0 6px 4px #333;
  cursor: pointer;
  transition: transform 0.1s, box-shadow 0.1s;
}
button:active {
  box-shadow: 0 2px 3px #333;
  transform: translate(-2px, 2px);
}

@media (min-width: 1150px) {
  .site-banner {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 120px;
    padding-right: 120px;
  }
}
</style>
