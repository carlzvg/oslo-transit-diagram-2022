<template>
  <v-app id="app">
    <l-map 
      ref="diagram"
      :minZoom="minZoom"
      :maxZoom="maxZoom"
      :style="diagramStyle"
      :crs="crs"
      @ready="onDiagramReady()">
      <l-geo-json
        name="station"
        ref="geoJson"
        :geojson="stationGeoJson"
        :options="featureJsonOptions"
        @ready="onStationGeoJsonReady()">
      </l-geo-json>
    </l-map>
    <v-bottom-sheet
      v-model="infoPane"
      inset
    >
      <v-sheet
        class="text-center"
        height="200px"
      >
        <v-btn
          class="mt-6"
          text
          color="red"
          @click="infoPane = !infoPane"
        >
          close
        </v-btn>
      </v-sheet>
    </v-bottom-sheet>
  </v-app>
</template>

<script>
import L from 'leaflet';
import stationGeoJson from './station.json';
import informationJson from './information.json';

export default {
  name: 'App',
  components: {  },
  data: () => ({
    infoPane: false,
    diagram: null,
    diagramStyle: {
      'z-index': 0,
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`
    },
    stationGeoJson: stationGeoJson,
    featureLayer: null,
    featureJsonOptions: null,  
    minZoom: 10,
    maxZoom: 16,
    diagramImage: null,
    crs: L.CRS.Simple,
    informationJson: informationJson
  }),
  methods: {
    onFeatureClick(feature) {
      this.infoPane = true;

      const { stationId } = feature.target?.feature?.properties;

      const stationInfo = this.informationJson.station.find((station) => station.id === stationId);
      console.log(stationInfo);
    },
    onEachFeature(feature, layer) {
      layer.on({
        click: this.onFeatureClick
      })
    },
    onStationGeoJsonReady() {
      this.featureLayer = this.$refs.geoJson.mapObject;
    },
    onDiagramReady() {
      this.diagram = this.$refs.diagram.mapObject;

      const diagramUrl = '/Oslo_Kollektivkart_2022.svg';
      const bounds = L.latLngBounds([[0, 0], [0.19636, 0.13889]]);
      
      L.imageOverlay(diagramUrl, bounds).addTo(this.diagram);

      this.diagram.fitBounds(bounds);

      this.diagram.addEventListener('click', function(ev) {
        console.log(ev);
      });
    },
  },
  created() {
    this.featureJsonOptions = {
      onEachFeature: this.onEachFeature
    }
  }
}
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}

.v-dialog__container {
    display: unset; 
}
</style>
