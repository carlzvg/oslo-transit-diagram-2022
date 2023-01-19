<template lang="pug">
v-card#info-card(elevation="4")
	v-card-text.pa-0
		v-btn.float-right(fab icon small @click="$emit('close')")
			v-icon mdi-close
		v-btn.float-right(v-if="info.info.geometry" fab icon small @click="$emit('locate', info.info.geometry)")
			v-icon mdi-crosshairs-gps
		v-container
			station-card(v-if="info.type == 'station'" :data="info.info")
</template>

<script>
import StationCard from './StationCard.vue';

export default {
  components: { StationCard },
	props: {
    info: Object
  }
};
</script>

<style scoped>
#info-card {
  z-index: 9;
  position: absolute;
  width: calc(100vw - 84px);
  max-width: 650px;
  bottom: 18px;
  left: 20px;
  right: 0;
  margin-right: auto;
}
</style>