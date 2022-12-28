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
            v-chip.mr-4(label small :color="getLineCssColor(line)")
              .white--text.font-weight-black {{ line.code }}
          v-expansion-panel-content
            .route(v-for="(route, routeIndex) in line.route" 
              :key="getRouteKey(line, routeIndex)"
              :style="renderRouteLineCss(line)")
              h4 {{ renderRouteName(route) }}
              v-timeline.py-0.my-4(align-top dense dark)
                v-timeline-item(
                  v-for="(stop, stopIndex) in route" 
                  :key="getStopKey(routeIndex, stopIndex, 'step')" 
                  color="white"
                  small)
                  | {{ renderStationName(stop) }}
              
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
    renderStationName(stationId) {
      const station = this.getStationInfo(stationId);

      return `${station.norwegian}`;
    },
    getLineCssColor(line) {
      return `#${line.color}`;
    },
    getStopKey(routeIndex, stopIndex, type) {
      return `stop-${routeIndex}-${stopIndex}-${type}`;
    },
    renderRouteLineCss(line) {
      return { '--lineColor': `#${line.color}` };
    }
  },
}
</script>

<style scoped>
.v-application--is-ltr .v-timeline--dense:not(.v-timeline--reverse)::before {
  left: calc(48px - 2px);
  right: initial;
}

.v-timeline:before {
  width: 4px;
}

.v-timeline > .v-timeline-item:last-child {
  padding-bottom: 0px;
}

.v-timeline:before {
  background: var(--lineColor) !important;
}

.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: unset;
}

</style>