<script>
import { SOCKET_ADDR, STORAGE_KEY } from "@/constants";
import Decimal from "decimal.js";
import { RouteEnum } from "@/router";
import LineBox from "@/components/LineBox";
import voltageDisplayMixin from "@/mixins/voltage-display-mixin";

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
    const initialValue = Decimal(processed[key])
      .div(valueDiv[key])
      .toDP(valueDP[key]);
    const absValue = initialValue.abs();
    processed[key] = { initialValue, absValue };
  });

  return processed;
}

export default {
  components: { LineBox },
  mixins: [voltageDisplayMixin],
  data() {
    return {
      ws: null,
      transmissionData: {
        power: { initialValue: null, absValue: null },
        mvar: { initialValue: null, absValue: null },
        voltage: { initialValue: null, absValue: null },
        current: { initialValue: null, absValue: null },
      },
      defaultTransmissionData: {
        power: { initialValue: null, absValue: null },
        mvar: { initialValue: null, absValue: null },
        voltage: { initialValue: null, absValue: null },
        current: { initialValue: null, absValue: null },
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
    arrowDisplayClass() {
      const {
        voltage: { initialValue: voltageValue },
      } = this.transmissionData;
      return voltageValue > 0 ? "success" : "";
    },
    outArrowClass() {
      const {
        power: { initialValue: voltageInitialValue },
      } = this.transmissionData;

      if (!voltageInitialValue) {
        return "";
      }

      return voltageInitialValue > 0 ? "fa-angle-left" : "fa-angle-right";
    },
    inArrowClass() {
      const {
        power: { initialValue: voltageInitialValue },
      } = this.transmissionData;

      if (!voltageInitialValue) {
        return "";
      }

      return voltageInitialValue > 0 ? "fa-angle-down" : "fa-angle-up";
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
        return;
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
  <div>
    <p v-if="msg.text" class="general" :class="msg.type">
      {{ msg.text }}
    </p>

    <div id="grid-container">
      <div id="col1">

        <div id="sakete">
          <b style="font-size: 18px">SAKETE TS</b>
          <div id="sakete-nw1">
            <!--line box content starts -->
            <LineBox name="NW1" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <!-- Horizontal arrow from nw1 -->
          <hr id="sakete-nw1-h" />
        </div>
        
        <div id="akangba">
          <b style="font-size: 18px">AKANGBA TS</b>
          <div id="akangba-w3l">
            <!--line box content starts -->
            <LineBox name="W3L" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <!-- Horizontal arrow from w3l -->
          <hr id="akangba-w3l-h" />

          <div id="akangba-w4l">
            <!--line box content starts -->
            <LineBox name="W4L" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <!-- Horizontal arrow from w4l -->
          <hr id="akangba-w4l-h" />
        </div>
        
        <div id="ikeja-west">
          <b style="font-size: 18px">IKEJA-WEST TS</b>
          <div id="ikejaW-nw1">
            <!--line box content starts -->
            <LineBox name="NW1" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <div id="ikejaW-r1w">
            <!--line box content starts -->
            <LineBox name="R1W" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <div id="ikejaW-h1w">
            <!--line box content starts -->
            <LineBox name="H1W" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <div id="ikejaW-m5w">
            <!--line box content starts -->
            <LineBox name="M5W" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <div id="ikejaW-w3l">
            <!--line box content starts -->
            <LineBox name="W3L" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <div id="ikejaW-w4l">
            <!--line box content starts -->
            <LineBox name="W4L" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <div id="ikejaW-k7w">
            <!--line box content starts -->
            <LineBox name="K7W" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <span id="ikejaW-k7w-v" :class="arrowDisplayClass"
            ><i
              id="ikejaW-k7w-v-arrow-up"
              class="fas"
              :class="[inArrowClass, arrowDisplayClass]"
            ></i
          ></span>

          <div id="ikejaW-k8w">
            <!--line box content starts -->
            <LineBox name="K8W" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <span id="ikejaW-k8w-v"></span>

          <div id="ikejaW-n6w">
            <!--line box content starts -->
            <LineBox name="N6W" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <!-- Horizontal arrow from n6w -->
          <hr id="ikejaW-n6w-h" />
          <!-- Vertical arrow from n6w -->
          <span id="ikejaW-n6w-v"></span>
        </div>
        <div id="okearo">
          <b style="font-size: 18px">OKEARO TS</b>
          <div id="okearo-k7w">
            <!--line box content starts -->
            <LineBox name="K7W" :transmissionData="transmissionData" />
            <!-- Line Box content ends -->
          </div>
          <hr id="okearo-k7w-h" :class="arrowDisplayClass" />
          <i
            id="okearo-k7w-v-arrow-right"
            class="fas"
            :class="[outArrowClass, arrowDisplayClass]"
          ></i>

          <div id="okearo-k8w">
            <!--line box content starts -->
            <LineBox name="K8W" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <hr id="okearo-k8w-h" />

          <div id="okearo-n8k">
            <!--line box content starts -->
            <LineBox name="N8K" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <hr id="okearo-n8k-h" />

          <div id="okearo-n7k">
            <!--line box content starts -->
            <LineBox name="N7K" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <hr id="okearo-n7k-h" />
        </div>

        <div id="ajah">
          <b style="font-size: 18px">AJAH TS</b>
          <div id="ajah-n3j">
            <!--line box content starts -->
            <LineBox name="N3J" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <!-- Horizontal arrow from n3j -->
          <hr id="ajah-n3j-h" />

          <div id="ajah-n4j">
            <!--line box content starts -->
            <LineBox name="N4J" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <!-- Horizontal arrow from n4j -->
          <hr id="ajah-n4j-h" />

          <div id="ajah-j1e">
            <!--line box content starts -->
            <LineBox name="J1E" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <!-- Horizontal arrow from n3j -->
          <hr id="ajah-j1e-h" />

          <div id="ajah-j1b">
            <!--line box content starts -->
            <LineBox name="J1B" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <!-- Vertical arrow from j1b -->
          <span id="ajah-j1b-v"></span>
        </div>

        <div id="egbin">
          <b style="font-size: 18px">EGBIN TS</b>
          <div id="egbin-n7k">
            <!--line box content starts -->
            <LineBox name="N7K" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <span id="egbin-n7k-v"></span>

          <div id="egbin-n8k">
            <!--line box content starts -->
            <LineBox name="N8K" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <span id="egbin-n8k-v"></span>

          <div id="egbin-n6w">
            <!--line box content starts -->
            <LineBox name="N6W" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <div id="egbin-b6n">
            <!--line box content starts -->
            <LineBox name="B6N" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>

          <div id="egbin-n3j">
            <!--line box content starts -->
            <LineBox name="N3J" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <div id="egbin-n4j">
            <!--line box content starts -->
            <LineBox name="N4J" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
        </div>

        <div id="alagbon">
          <b style="font-size: 18px">ALAGBON TS</b>
          <div id="alagbon-j1b">
            <!--line box content starts -->
            <LineBox name="J1B" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <div id="alagbon-b1e">
            <!--line box content starts -->
            <LineBox name="B1E" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <!-- Horizontal arrow from b1e -->
          <hr id="alagbon-b1e-h" />
        </div>

        <div id="lekki">
          <b style="font-size: 18px">LEKKI TS</b>
          <div id="lekki-j1e">
            <!--line box content starts -->
            <LineBox name="J1E" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
          <!-- Vertical arrow from j1e -->
          <span id="lekki-j1e-v"></span>

          <div id="lekki-b1e">
            <!--line box content starts -->
            <LineBox name="B1E" :transmissionData="defaultTransmissionData" />
            <!-- Line Box content ends -->
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<style scoped>
hr {
  border-color: #000;
}
hr.success,
#ikeja-west #ikejaW-k8w-v.success {
  border-color: green;
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
.fas.error,
.general.error {
  color: #f00;
}
.fas.success,
.general.success {
  color: #0f7f0f;
}
.main-card {
  background-color: var(--dark-blue);
  margin-top: 0;
  padding: 0em 1em;
  padding-bottom: 2em;
  border-radius: 8px;
  height: 220px;
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
  border: 2px solid #778495;
  position: absolute;
  top: 47%;
}
.input-line {
  left: -50%;
}
.output-line {
  left: 97%;
}
.main-card.error {
  background-color: red;
}
.main-card.success {
  background-color: green;
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
</style>
