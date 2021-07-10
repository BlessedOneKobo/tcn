<template>
  <div class="main-card" :class="voltageDisplayClass">
    <b style="font-size: 16px">{{ name }}</b>
    <div class="details-card">
      <div class="detail">
        <span class="detail-text">
          {{ transmissionDataMessage("power") }}
        </span>
      </div>
    </div>

    <div class="details-card">
      <div class="detail">
        <span class="detail-text">
          {{ transmissionDataMessage("current") }}
        </span>
      </div>
    </div>

    <div class="details-card">
      <div class="detail">
        <span class="detail-text">
          {{ transmissionDataMessage("voltage") }}
        </span>
      </div>
    </div>

    <div class="details-card">
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
  power: "Mw",
  mvar: "Mvar",
  voltage: "KV",
  current: "A",
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
  padding: 0em 0.5em;
  padding-bottom: 2em;
  border-radius: 8px;
  height: 78%;
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
.details-card.error {
  color: red;
}
.details-card:not(:last-of-type) {
  margin-bottom: 0.6em;
}
.details-card .detail {
  background-color: #fff;
  min-height: 2em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 1em;
  font-weight: bold;
  font-size: 70%;
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
