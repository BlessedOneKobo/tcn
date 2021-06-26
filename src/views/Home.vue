<script>
import { SOCKET_ADDR, STORAGE_KEY } from "@/constants";
import { RouteEnum } from "@/router";

export default {
  data() {
    return {
      ws: null,
      transmissionData: {
        power: null,
        mvar: null,
        voltage: null,
        current: null,
      },
      transmissionUnit: Object.freeze({
        power: "mw",
        mvar: "mvar",
        voltage: "kv",
        current: "amp",
      }),
      threshold: Object.freeze({
        voltage: Object.freeze({ min: 320, max: 350 }),
      }),
      msg: {
        text: "",
        type: "",
      },
      timeout: null,
      reconnectInterval: null,
    };
  },
  computed: {
    hasEmptyTransmissionValue() {
      return Object.values(this.transmissionData).includes("");
    },
    voltageDisplayClass() {
      const { voltage } = this.transmissionData;
      const { voltage: voltageThreshold } = this.threshold;

      if (!voltage) {
        return "";
      }

      if (voltage > voltageThreshold.max || voltage < voltageThreshold.min) {
        return "error";
      }

      return "success";
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
  watch: {
    hasEmptyTransmissionValue(newValue, oldValue) {
      if (newValue) {
        this.msg = {
          text: "Error in connection",
        };
        return;
      }

      if (!newValue && oldValue) {
        this.msg.text = "";
      }
    },
  },
  methods: {
    connect() {
      this.ws = new WebSocket(SOCKET_ADDR);

      this.timeout = setTimeout(() => {
        this.timeoutFlag = true;
        this.msg = {
          text: "No connection",
          type: "error",
        };
        console.error("connected, but no data received");
      }, 10000);

      this.ws.onmessage = (msg) => {
        if (this.timeoutFlag) {
          this.showConnectionMessage();
        }

        clearTimeout(this.timeout);
        this.transmissionData = JSON.parse(msg.data);

        this.timeout = setTimeout(() => {
          this.timeoutFlag = true;
          this.msg = {
            text: "Connection lost",
            type: "error",
          };
        }, 30000);
      };

      this.ws.onerror = (e) => {
        console.log("onerror", e);
      };

      this.ws.onclose = (e) => {
        console.log("onclose", e);
        this.reconnectInterval = setInterval(() => {
          this.connect();
        }, 5000);
      };

      this.ws.onopen = (e) => {
        console.log("onopen", e);
        clearInterval(this.reconnectInterval);

        if (this.timeoutFlag) {
          this.showConnectionMessage();
        }
      };
    },
    showConnectionMessage() {
      this.timeoutFlag = false;
      this.msg = {
        text: "Connected",
        type: "success",
      };
      setTimeout(() => {
        this.msg.text = "";
      }, 5000);
    },
    logOut() {
      if (this.ws) {
        this.ws.close();
      }

      localStorage.removeItem(STORAGE_KEY);
      this.$router.push(RouteEnum.LOGIN);
    },
  },
  mounted() {
    this.connect();
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

    <p v-if="msg.text" class="general" :class="msg.type">
      {{ msg.text }}
    </p>

    <div class="container">
      <div class="main-card" :class="voltageDisplayClass">
        <div class="card-line input-line"></div>
        <div class="card-line output-line"></div>
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
            <span class="detail-text">
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
.general {
  background-color: #fff;
  padding: 1.25em;
  margin: 1.25em auto;
  max-width: 75%;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.general.error {
  color: #f00;
}
.general.success {
  color: #0f7f0f;
}
.main-card {
  background-color: var(--dark-blue);
  padding: 2em 1em;
  border-radius: 8px;
  position: relative;
}
.main-card.error {
  background-color: red;
}
.main-card.success {
  background-color: green;
}
.main-card.error .card-line {
  border-color: red;
}
.main-card.success .card-line {
  border-color: green;
}
.card-line {
  width: 50%;
  border: 6px solid #778495;
  position: absolute;
  top: 47%;
}
.input-line {
  left: -50%;
}
.output-line {
  left: 97%;
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
.details-card .detail-text.success {
  color: green;
}
.details-card .detail-text.error {
  color: red;
}

@media (min-width: 425px) {
  .details-card .detail-text {
    font-size: 1.5em;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 60%;
    margin: 3em auto;
  }
  .main-card {
    max-width: 50%;
    margin: 0 auto;
  }
  .details-card {
    justify-content: flex-start;
    align-items: center;
  }
  .details-card .detail {
    max-height: 2em;
    font-weight: bold;
    font-size: 0.75em;
    padding: 1em;
    margin-left: 1em;
  }
}

@media (min-width: 1150px) {
  .navigation {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 120px;
    padding-right: 120px;
  }
}
</style>
