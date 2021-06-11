<template>
  <div>
    <div class="navigation">
      <h2 class="description">Ugwuaji 330 kva power line</h2>
      <div class="logout-section">
        <button>Log out</button>
      </div>
    </div>

    <div class="container">
      <div class="main-card">
        <div class="details-card">
          <div class="symbol">
            <img src="@/assets/watt.png" width="170" height="92" />
          </div>
          <div class="detail">
            <span class="detail-text">190mw</span>
          </div>
        </div>

        <div class="details-card">
          <div class="symbol">
            <img src="@/assets/amp.png" width="170" height="92" />
          </div>
          <div class="detail">
            <span class="detail-text">220amp</span>
          </div>
        </div>

        <div class="details-card">
          <div class="symbol">
            <img src="@/assets/volt.png" width="170" height="92" />
          </div>
          <div class="detail">
            <span class="detail-text">12kv</span>
          </div>
        </div>

        <div class="details-card">
          <div class="symbol">
            <img src="@/assets/reactive.png" width="170" height="92" />
          </div>
          <div class="detail">
            <span class="detail-text">3000mx</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navigation {
  background-color: var(--dark-blue);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: var(--padding-y);
  padding-bottom: var(--padding-y);
  margin-bottom: var(--sm-margin-y);
}
.navigation .description {
  font-weight: normal;
  font-size: 2em;
}
.navigation .logout-section button {
  background-color: #fff;
  color: #000;
  font-size: 1.125em;
  min-width: 8em;
}
.container {
  padding-right: -15px;
  padding-left: -15px;
  padding-bottom: 30px;
}
.main-card {
  background-color: var(--dark-blue);
  padding: 2em 1em;
  border-radius: 8px;
}
.details-card {
  display: flex;
  justify-content: space-between;
}
.details-card:not(:last-of-type) {
  margin-bottom: 1.5em;
}
.details-card .symbol {
  flex: 0 1 25%;
}
.details-card .symbol img {
  width: 100%;
  height: auto;
  display: flex;
  align-items: stretch;
}
.details-card .detail {
  flex: 0 1 65%;
  background-color: #fff;
  min-height: 2em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 1em;
  font-weight: bold;
}
.details-card .detail-text {
  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
}
.details-card .detail-text.active {
  transform: scale(1.125);
}
.details-card .detail-text.increase {
  color: green;
}
.details-card .detail-text.decrease {
  color: red;
}

@media (min-width: 425px) {
  .details-card .detail-text {
    font-size: 1.5em;
  }
}

@media (min-width: 700px) {
  .container {
    margin-top: 3em;
    padding-right: 120px;
    padding-left: 120px;
  }

  .main-card {
    padding: 1.25em 2em;
  }
  .details-card .detail-text {
    font-size: 2em;
  }
}

@media (min-width: 1150px) {
  .container {
    margin-top: 6em;
  }
  .navigation {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 120px;
    padding-right: 120px;
  }
  .main-card {
    padding: 2.5em 4em;
  }
}

@media (min-width: 1200px) {
  .details-card .detail-text {
    font-size: 2.25em;
  }
}
</style>
