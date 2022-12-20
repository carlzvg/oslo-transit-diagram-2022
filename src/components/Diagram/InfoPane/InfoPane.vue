<template lang="pug">
v-bottom-sheet(
	v-model="activation"
	hide-overlay
	inset
)
	v-sheet
		v-btn.float-right(fab icon small @click="activation = false")
			v-icon mdi-close
		v-btn.float-right(v-if="info.geometry" fab icon small @click="activation = false")
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
  },
  data: () => ({
		activation: false,
	}),
	watch: {
		info: {
			handler(info) {
				console.log('info', info);
				this.activation = info.value;
			},
			deep: true
		}
	}
};
</script>