<script>
const transmissionUnit = Object.freeze({
  power: "mw",
  mvar: "mvar",
  voltage: "kv",
  current: "amp",
});
const threshold = Object.freeze({
  voltage: Object.freeze({ min: 320, max: 350 }),
});

export default {
  props: {
    transmissionData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    transmissionDataMessage() {
      return (property) => {
        const data = this.transmissionData[property];
        const unit = transmissionUnit[property];

        if (!data) {
          return "Loading...";
        }

        return `${data}${unit}`;
      };
    },
    voltageDisplayClass() {
      const { voltage } = this.transmissionData;
      const { voltage: voltageThreshold } = threshold;

      if (!voltage) {
        return "";
      }

      if (
        voltage.gt(voltageThreshold.max) ||
        voltage.lt(voltageThreshold.min)
      ) {
        return "error";
      }

      return "success";
    },
  },
};
</script>

<template>
  <div class="main-card" :class="voltageDisplayClass">
    <div class="card-line input-line"></div>
    <div class="card-line output-line"></div>
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

<style scoped>
.main-card {
  background-color: var(--dark-blue);
  /*padding: 2em 1em;*/
  border-radius: 8px;
  position: absolute;
  bottom: 985px;
  left: 450px;
  width: 213px;
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
  border: 2px solid #778495;
  position: absolute;
}
.input-line {
  width: 295px;
  transform: rotate(90deg);
  left: 530px;
  bottom: 215px;
}
.output-line {
  width: 445px;
  left: 100%;
  top: 50%;
}
.main-card.error {
  background-color: red;
}
.main-card.success {
  background-color: green;
}
/*.details-card {
  display: flex;
  justify-content: space-between;
}*/
.details-card.error {
  color: red;
}
.details-card:not(:last-of-type) {
  /*margin-bottom: 1.5em;*/
  margin-bottom: 5px;
}
/*.details-card .symbol {
  flex: 0 1 25%;
}
.details-card .symbol img {
  width: 100%;
  height: auto;
  display: flex;
  align-items: stretch;
}
*/
.details-card .detail {
  /*flex: 0 1 65%;*/
  background-color: #fff;
  /*min-height: 2em;*/
  /*display: flex;
  justify-content: flex-start;
  align-items: center;*/
  /*padding-left: 1em;*/
  font-weight: bold;
  padding: 4px;
}
.details-card .detail-text {
  font-size: 15px;
}
.details-card .detail-text.success {
  color: green;
}
.details-card .detail-text.error {
  color: red;
}

@media (min-width: 425px) {
  .details-card .detail-text {
    /*font-size: 1.5em;*/
  }
}

@media (min-width: 768px) {
  .main-card {
    padding: 10px;
  }
  .details-card {
    justify-content: flex-start;
    align-items: center;
  }
  .details-card .detail {
    /*    max-height: 2em;
    font-weight: bold;
    font-size: 0.75em;
    padding: 1em;
    margin-left: 1em;*/
    /*padding: 2.5px;*/
  }
}
</style>
