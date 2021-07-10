<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="details-card">
    <div class="detail">
      <span class="detail-text">
        {{ text }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.details-card.error {
  color: var(--error-color);
}
.details-card:not(:last-of-type) {
  margin-bottom: 0.1em;
}
.details-card .detail {
  background-color: #fff;
  min-height: 2em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 1em;
  font-weight: bold;
  font-size: 55%;
}
.details-card .detail-text {
  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
}
.details-card .detail-text.active {
  transform: scale(1.125);
}
.details-card .detail-text.success {
  color: var(--success-color);
}
.details-card .detail-text.error {
  color: var(--error-color);
}
</style>
