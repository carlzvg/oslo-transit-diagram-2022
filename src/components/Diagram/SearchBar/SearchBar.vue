<template lang="pug">
#search-bar
  #diagram-title.font-weight-black Oslo Transit Diagram 2022
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
    //- TODO: make update on dropdown menu
    //- template(v-slot:item="{ item, on, attrs }")
    //-   v-list-item 
    //-     v-list-item-content
    //-       v-list-item-title {{ item.keyword }}
</template>

<script>
import information from '@/information.json';
import graph, { findPath } from './graphSearch';

export default {
  data: () => ({
    keyword: {},
    stationsInfo: []
  }),
  methods: {
    search() {
      const { id } = this.keyword;

      this.$emit('updateSearch', id);
    }
  },
  mounted() {
    this.stationsInfo = information.station.map((stn) => {
      const altName = stn?.english ? ` (${stn.english})` : '';

      stn.keyword = `${stn.norwegian}${altName}`;
      return stn;
    });

    console.log(graph);
    console.log(findPath(62, 1));
  }
}
</script>

<style scoped>
#diagram-title {
  background-color: #FAF9F7;
}
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