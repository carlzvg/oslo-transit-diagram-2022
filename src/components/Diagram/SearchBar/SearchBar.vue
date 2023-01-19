<template lang="pug">
#search-bar
  .font-weight-black Oslo Transit Diagram 2022
  v-autocomplete(
    v-model="keyword"
    :items="stationsInfo"
    label="Search for station"
    item-text="keyword"
    item-value="id"
    return-object
    prepend-icon=""
    hide-no-data
    hide-selected
    solo dense hide-hint
    @input="search")
</template>

<script>
// import graph, { findPath } from './graphSearch';
// import searchIndex from './lunrSearch';
import information from '@/information.json';
import station from '@/station.json';

export default {
  data: () => ({
    keyword: {},
    stationsInfo: []
  }),
  methods: {
    search() {
      const { id: stationId, zone: zoneId } = this.keyword;

      const lineInfo = information.line.filter((line) =>
        line.route?.some((route) => route?.includes(stationId))
      );

      const zoneInfo = information.zone.find(
        (zone) => zone.id === zoneId
      )

      const feature = station?.features.find((f) => f.properties?.stationId == stationId);

      this.$emit('updateSearch', {
        value: true,
        type: "station",
        info: {
          station: this.keyword,
          line: lineInfo,
          zone: zoneInfo,
          geometry: feature
        },
      });
    }
  },
  mounted() {
    // console.log('graph', graph);
    // console.log(findPath(1, 75));

    // console.log(searchIndex.search('Gulskogen'));

    this.stationsInfo = information.station.map((stn) => {
      const altName = stn?.english ? ` (${stn.english})` : '';

      stn.keyword = `${stn.norwegian}${altName}`;
      return stn;
    });
  }
}
</script>

<style scoped>
#search-bar {
  z-index: 9;
  position: absolute;
  width: 80vw;
  max-width: 800px;
  top: 18px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
</style>