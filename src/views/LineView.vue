<template lang="pug">
#line-view
  .float-right
    v-btn(text small :color="highlightLanguage('norwegian')" @click="lang = 'norwegian'") NOR
    | |
    v-btn(text small :color="highlightLanguage('english')" @click="lang = 'english'") ENG
  v-container
    .transport-type.mb-3(v-for="transportType in types" :key="transportType.id")
      h1 {{ transportType[lang] }}
      v-expansion-panels(accordion)
        v-expansion-panel(v-for="line in filterLinesByType(transportType.id)" :key="line.id")
          v-expansion-panel-header 
            v-chip(label small :color="getLineCssColor(line)")
              .white--text.font-weight-black {{ line.code }}
          v-expansion-panel-content
            .route(v-for="(route, index) in line.route" :key="getRouteKey(line, index)")
              h4 {{ renderRouteName(route) }}
              v-stepper(vertical)
                .line-stop(v-for="")
                v-stepper-step(step="1")
                v-stepper-content(step="1")
                v-stepper-step(step="2")
                v-stepper-content(step="2")
                v-stepper-step(step="3")
                v-stepper-content(step="3")
                v-stepper-step(step="4")
                v-stepper-content(step="4")
              
</template>

<script>
import information from '@/information.json';

export default {
  data: () => ({
    lang: 'norwegian',
    types: information.type,
    lines: information.line,
    stations: information.station
  }),  
  methods: {
    highlightLanguage(displayLang) {
      return this.lang === displayLang ? 'primary' : '';
    },
    filterLinesByType(typeId) {
      return this.lines.filter((line) => line.type === typeId);
    },
    getRouteKey(line, currIndex) {
      return `${line.id}-${currIndex}`;
    },
    getStationInfo(stationId) {
      return this.stations.find((station) => station.id === stationId);
    },
    renderRouteName(route) {
      if (!route || route.length < 1) return '';

      const firstStation = this.getStationInfo(route[0]);
      const lastStation = this.getStationInfo(route[route.length - 1]);

      return `${firstStation.norwegian} - ${lastStation.norwegian}`;
    },
    getLineCssColor(line) {
      return `#${line.color}`;
    },
  },
}
</script>

<style scoped>
#line-view {
  min-height: 100%;
}
</style>