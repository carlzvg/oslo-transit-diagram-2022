<template lang="pug">
#zoom-control
  v-btn.btn-zoom(fab bottom right small @click="zoomIn")
    v-icon mdi-plus
  v-btn.btn-zoom.mt-2(fab bottom right small @click="zoomOut")
    v-icon mdi-minus
</template>

<script>
export default {
  props: {
    disabled: Boolean,
  },
  methods: {
    zoomIn() {
      this.$emit("zoomIn");
    },
    zoomOut() {
      this.$emit("zoomOut");
    },
  },
};
</script>

<style scoped>
#zoom-control {
  position: absolute;
  z-index: 9;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;
}
</style>
