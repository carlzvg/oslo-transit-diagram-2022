<template lang="pug">
div 
	h4.station-name {{ data?.station?.norwegian }}
	v-chip.line-info.mr-2(
		v-if="data?.line"
		v-for="line in data.line"
		:key="line.id"
		:color="getColor(line)"
		label small) 
		.white--text.font-weight-black {{ line?.code }}
	h6.fare-zone-info(v-if="data?.zone")
		v-icon(x-small) mdi-currency-usd 
		| {{ data?.zone?.norwegian }} 
		span(v-if="data?.zone?.english") ({{ data.zone?.english }})
</template>

<script>
export default {
  props: {
    data: Object,
  },
	methods: {
		getColor(lineInfo) {
			return `#${lineInfo.color}`;
		}
	},
	mounted() {
		console.log("StationCard", this.data);
	}
};
</script>
