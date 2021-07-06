<template>
  <div class="main-card" :class="voltageDisplayClass">
    <b style="font-size: 16px">{{ name }}</b>
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
</template>

<script>
import voltageDisplayMixin from "@/mixins/voltage-display-mixin";

const transmissionUnit = Object.freeze({
  power: "mw",
  mvar: "mvar",
  voltage: "kv",
  current: "amp",
});

export default {
  name: "LineBox",
  props: ["name", "transmissionData"],
  mixins: [voltageDisplayMixin],
  computed: {
    hasEmptyTransmissionValue() {
      return Object.values(this.transmissionData).includes("");
    },
    transmissionDataMessage() {
      return (property) => {
        const { absValue: data } = this.transmissionData[property];
        const unit = transmissionUnit[property];

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
  data() {
    return {
      msg: {
        text: "",
        type: "",
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
