const threshold = Object.freeze({
  voltage: Object.freeze({ min: 300, max: 342 }),
});

export default {
  computed: {
    voltageDisplayClass() {
      const {
        voltage: { absValue: voltageAbsValue },
      } = this.transmissionData;
      const { voltage: voltageThreshold } = threshold;

      if (!voltageAbsValue || voltageAbsValue.eq(0)) {
        return "";
      }

      const aboveThreshold = voltageAbsValue.gt(voltageThreshold.max);
      const belowThreshold = voltageAbsValue.lt(voltageThreshold.min);

      if (aboveThreshold || belowThreshold) {
        return "error";
      }

      return "success";
    },
  },
};
