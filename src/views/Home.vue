<script>
import { SOCKET_ADDR, STORAGE_KEY } from "@/constants";
import Decimal from "decimal.js";
import { RouteEnum } from "@/router";
import TransmissionCard from "../components/TransmissionCard.vue";

const ERROR_MESSAGE_INTERVAL = 30000;
const valueDP = Object.freeze({
  power: 2,
  mvar: 2,
  voltage: 0,
  current: 0,
});
const valueDiv = Object.freeze({
  power: 1000,
  mvar: 1000,
  voltage: 1000,
  current: 1,
});

let timeout = null;
let timeoutFlag = false;
let reconnectInterval = null;

function processData(data) {
  const processed = data;

  Object.keys(processed).forEach((key) => {
    processed[key] = Decimal(processed[key])
      .abs()
      .div(valueDiv[key])
      .toDP(valueDP[key]);
  });

  return processed;
}

export default {
  components: {
    TransmissionCard,
  },
  data() {
    return {
      ws: null,
      transmissionData: {
        power: null,
        mvar: null,
        voltage: null,
        current: null,
      },
      msg: {
        text: "",
        type: "",
      },
    };
  },
  computed: {
    hasEmptyTransmissionValue() {
      return Object.values(this.transmissionData).includes("");
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
    connect(reconnect = false) {
      this.ws = new WebSocket(SOCKET_ADDR);

      timeout = setTimeout(() => {
        timeoutFlag = true;
        this.msg = {
          text: "No connection",
          type: "error",
        };
        console.error("connected, but no data received");
      }, ERROR_MESSAGE_INTERVAL);

      this.ws.onmessage = (msg) => {
        if (timeoutFlag) {
          this.showConnectionMessage();
        }

        clearTimeout(timeout);
        this.transmissionData = processData(JSON.parse(msg.data));

        timeout = setTimeout(() => {
          timeoutFlag = true;
          this.msg = {
            text: "Connection lost",
          };
        }, ERROR_MESSAGE_INTERVAL);
      };

      this.ws.onerror = (e) => {
        console.log("onerror", e);
        return;
      };

      this.ws.onclose = (e) => {
        console.log("onclose", e);
        clearInterval(reconnectInterval);
        reconnectInterval = setInterval(() => {
          this.connect(true);
        }, 5000);
      };

      this.ws.onopen = (e) => {
        console.log("onopen", e);
        clearInterval(reconnectInterval);

        if (timeoutFlag) {
          this.showConnectionMessage();
        }

        if (reconnect) {
          return;
        }
      };
    },
    showConnectionMessage() {
      timeoutFlag = false;
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
  <div class="container">
    <img src="@/assets/grid.svg" class="overlay" />
    <!-- <div class="navigation">
      <h2 class="description">Oke Aro/Ikeja West 330kV line1</h2>
      <div class="logout-section">
        <button @click="logOut">Log out</button>
      </div>
    </div> -->

    <!-- <p v-if="msg.text" class="general" :class="msg.type">
      {{ msg.text }}
    </p> -->

    <!-- <div class="container"> -->
    <TransmissionCard v-bind="{ transmissionData }" />
    <!-- </div> -->
  </div>
</template>

<style scoped>
.container {
  position: relative;
}
.overlay {
  width: 3800px;
  display: block;
}
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

@media (min-width: 768px) {
  .container {
    max-width: 60%;
    margin: 3em auto;
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
