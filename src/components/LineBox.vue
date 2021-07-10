<script>
import DetailCard from "./DetailCard.vue";
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
  components: {
    DetailCard,
  },
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

<template>
  <div class="main-card" :class="voltageDisplayClass">
    <b style="font-size: 10px">{{ name }}</b>
    <DetailCard :text="transmissionDataMessage('power')" />

    <DetailCard :text="transmissionDataMessage('current')" />

    <DetailCard :text="transmissionDataMessage('voltage')" />

    <DetailCard :text="transmissionDataMessage('mvar')" />
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
  height: 68%;
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
</style>
