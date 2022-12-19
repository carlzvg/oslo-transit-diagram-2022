<template lang="pug">
v-btn#btn-zoom-out(fab bottom right small @click="zoomOut")
    v-icon mdi-minus
</template>

<script>
export default {
  props: {
    disabled: Boolean,
  },
  methods: {
    zoomIn() {
      this.$emit("zoomOut");
    },
  },
};
</script>

<style scoped>
#btn-zoom-in {
  z-index: 9;
  bottom: 0;
  right: 0;
  position: absolute;

  margin: 0 16px 24px 0;
}
</style>
