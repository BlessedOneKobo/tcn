<script>
import DetailCard from "./DetailCard.vue";
import voltageDisplayMixin from "@/mixins/voltage-display-mixin";
import { ToggleButton } from "vue-js-toggle-button";

const transmissionUnit = Object.freeze({
  power: "Mw",
  mvar: "Mvar",
  voltage: "KV",
  current: "A",
});

export default {
  name: "LineBox",
  props: [
    "arrowDisplayClass",
    "outArrowClass",
    "outDArrowClass",
    "name",
    "transmissionData",
  ],
  mixins: [voltageDisplayMixin],
  components: {
    DetailCard,
    ToggleButton,
  },
  data() {
    return {
      msg: {
        text: "",
        type: "",
      },
      status: true,
    };
  },
  computed: {
    cannotToggleStatus() {
      const {
        voltage: { initialValue: initialVoltage },
      } = this.transmissionData;

      if (!status && !initialVoltage) {
        return false;
      }

      return initialVoltage === null || initialVoltage > 0;
    },
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
};
</script>

<template>
  <div class="main-card" :class="voltageDisplayClass">
    <b style="font-size: 16px">{{ name }}</b>
    <i class="fas" :class="[outArrowClass, arrowDisplayClass]"></i>
    <i class="fas" :class="[outDArrowClass, arrowDisplayClass]"></i>
    <div class="line"></div>
    <div class="content-container">
      <div class="details-section">
        <DetailCard class="card" :text="transmissionDataMessage('power')" />

        <DetailCard class="card" :text="transmissionDataMessage('current')" />

        <DetailCard class="card" :text="transmissionDataMessage('voltage')" />

        <DetailCard class="card" :text="transmissionDataMessage('mvar')" />
      </div>
      <div class="status-section">
        <div class="status-button-container">
          <p>Status</p>
          <toggle-button
            v-model="status"
            color="#5A98F4"
            :disabled="cannotToggleStatus"
            labels
          />
        </div>
        <div class="radio-group">
          <label>
            <input type="radio" :disabled="status" />
            <span>Voltage Control</span>
          </label>
          <label>
            <input type="radio" :disabled="status" />
            <span>Work Permit</span>
          </label>
          <label>
            <input type="radio" :disabled="status" />
            <span>Fault</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-card {
  background-color: var(--dark-blue);
  margin-top: 0;
  padding: 0em 0.5em;
  padding-bottom: 2em;
  border-radius: 8px;
  height: 78%;
  position: relative;
  max-width: 80%;
}
.main-card.error {
  background-color: var(--error-color);
}
.main-card.success {
  background-color: var(--success-color);
}
.main-card.error .card-line {
  border-color: var(--error-color);
}
.main-card.success .card-line {
  border-color: var(--success-color);
}
.main-card.error {
  background-color: var(--error-color);
}
.main-card.success {
  background-color: var(--success-color);
}
.main-card.error .line {
  border-color: var(--arrow-success-color);
}
.main-card.success .line {
  border-color: var(--arrow-success-color);
}
.main-card.error .fas {
  color: var(--arrow-error-color);
}
.main-card.success .fas {
  color: var(--arrow-success-color);
}
.fas {
  font-size: 150%;
  position: absolute;
  top: 45.5%;
  right: -10%;
}
.fas:last-of-type {
  right: -25%;
}
.line {
  width: 35%;
  border: 2px solid var(--dark-blue);
  position: absolute;
  right: -35%;
  top: 50%;
}
.content-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.details-section,
.status-section {
  flex-basis: 42.5%;
}
.status-section {
  font-size: 110%;
  color: #fff;
}
.details-section .card {
  font-size: 150%;
}
.radio-group {
  display: flex;
  flex-direction: column;
}
.status-button-container {
  text-align: center;
  margin-bottom: 1.25em;
}
.status-section input[disabled="disabled"] + span {
  opacity: 0.5;
}
.status-button-container p {
  margin-bottom: 0;
}
</style>
