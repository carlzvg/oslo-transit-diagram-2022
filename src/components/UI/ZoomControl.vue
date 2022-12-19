<template lang="pug">
#zoom-control
  v-btn(fab bottom right small @click="$emit('zoomToExtent')")
    v-icon mdi-fullscreen-exit
  v-btn.mt-2(fab bottom right small @click="$emit('zoomIn')")
    v-icon mdi-plus
  v-btn.mt-2(fab bottom right small @click="$emit('zoomOut')")
    v-icon mdi-minus
</template>

<script>
export default {
  props: {
    disabled: Boolean,
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
