<script>
export default {
  data() {
    return {
      ws: null,
      transmissionData: {
        power: "",
        mvar: "",
        voltage: "",
        current: "",
      },
      transmissionUnit: Object.freeze({
        power: "mw",
        mvar: "amp",
        voltage: "kv",
        current: "mvar",
      }),
      threshold: Object.freeze({
        voltage: { min: 340, max: 350 },
      }),
    };
  },
  computed: {
    voltageDisplayClass() {
      const { voltage } = this.transmissionData;
      const { voltage: voltageThreshold } = this.threshold;

      if (voltage > voltageThreshold.max || voltage < voltageThreshold.min) {
        return "error";
      }

      return "";
    },
    transmissionDataMessage() {
      return (property) => {
        const data = this.transmissionData[property];
        const unit = this.transmissionUnit[property];

        if (!data) {
          return "Loading...";
        }

        return `${data}${unit}`;
      };
    },
  },
  methods: {
    logOut() {
      if (this.ws) {
        this.ws.close();
      }

      localStorage.removeItem("tcn-accessToken");
      this.$router.push({ name: "Login" });
    },
  },
  mounted() {
    this.ws = new WebSocket("ws://193.148.63.148:8080/");

    this.ws.onmessage = (msg) => {
      this.transmissionData = JSON.parse(msg.data);
    };
  },
};
</script>

<template>
  <div>
    <div class="navigation">
      <h2 class="description">Ugwuaji 330 kva power line</h2>
      <div class="logout-section">
        <button @click="logOut">Log out</button>
      </div>
    </div>

    <div class="container">
      <div class="main-card">
        <div class="details-card">
          <div class="symbol">
            <img src="@/assets/watt.png" width="170" height="92" />
          </div>
          <div class="detail">
            <span class="detail-text">
              {{ transmissionDataMessage("power") }}
            </span>
          </div>
        </div>

        <div class="details-card">
          <div class="symbol">
            <img src="@/assets/amp.png" width="170" height="92" />
          </div>
          <div class="detail">
            <span class="detail-text">
              {{ transmissionDataMessage("current") }}
            </span>
          </div>
        </div>

        <div class="details-card">
          <div class="symbol">
            <img src="@/assets/volt.png" width="170" height="92" />
          </div>
          <div class="detail">
            <span class="detail-text" :class="voltageDisplayClass">
              {{ transmissionDataMessage("voltage") }}
            </span>
          </div>
        </div>

        <div class="details-card">
          <div class="symbol">
            <img src="@/assets/reactive.png" width="170" height="92" />
          </div>
          <div class="detail">
            <span class="detail-text">
              {{ transmissionDataMessage("mvar") }}
            </span>
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
.details-card.error {
  color: red;
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
