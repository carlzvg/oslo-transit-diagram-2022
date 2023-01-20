<template lang="pug">
#station-card
	h2.station-name.pb-1 {{ data?.station?.norwegian }}
	v-chip.line-info.mr-2(
		v-if="data?.line"
		v-for="line in data.line"
		:key="line.id"
		:color="getColor(line)"
		label small
		:to="redirect(line.id)") 
		.white--text.font-weight-black {{ line?.code }}
	h4.fare-zone-info.mt-2(v-if="data?.zone")
		v-icon(small) mdi-currency-usd 
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
		},
		redirect(lineId) {
			return `/line?lineId=${lineId}`;
		}
	}
};
</script>
