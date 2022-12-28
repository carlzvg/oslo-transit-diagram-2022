<template lang="pug">
#diagram-view
  search-bar
  l-map(
    ref="diagram"
    :minZoom="minZoom"
    :maxZoom="maxZoom"
    :style="diagramStyle"
    :crs="crs"
    :options="diagramOption"
    @ready="onDiagramReady()"
  )
    l-control(position="bottomright")
      zoom-control(@zoomIn="zoomIn" @zoomOut="zoomOut" @zoomToExtent="zoomToExtent")
    l-geo-json(
      name="station"
      ref="geoJson"
      :geojson="stationGeoJson"
      :options="featureJsonOptions"
      @ready="onStationGeoJsonReady()")
  info-pane(:info="infoPane")
</template>

<script>
import L from "leaflet";
import stationGeoJson from "@/station.json";
import informationJson from "@/information.json";
import InfoPane from "@/components/Diagram/InfoPane";
import { ZoomControl, SearchBar } from "@/components/Diagram";

export default {
  name: "DiagramView",
  components: { InfoPane, ZoomControl, SearchBar },
  data: () => ({
    infoPane: {
      value: false,
      type: "",
      info: {},
    },
    diagram: null,
    diagramStyle: {
      "z-index": 0,
      width: "100%",
      height: "100%",
    },
    diagramOption: {
      attributionControl: false,
      zoomControl: false,
    },  
    stationGeoJson: stationGeoJson,
    featureLayer: null,
    featureJsonOptions: null,
    minZoom: 10,
    maxZoom: 16,
    diagramImage: null,
    crs: L.CRS.Simple,
    informationJson: informationJson,
  }),
  methods: {
    zoomToExtent() {
      const bounds = L.latLngBounds([
        [0, 0],
        [0.19636, 0.13889],
      ]);

      if (this.diagram) this.diagram.fitBounds(bounds);
    },
    zoomIn() {
      if (this.diagram) this.diagram.zoomIn();
    },
    zoomOut() {
      if (this.diagram) this.diagram.zoomOut();
    },
    onFeatureClick(feature) {
      const { stationId, zoneId } = feature.target?.feature?.properties;

      const stationInfo = this.informationJson.station.find(
        (station) => station.id === stationId
      );

      const lineInfo = this.informationJson.line.filter((line) =>
        line.route?.some((route) => route?.includes(stationId))
      );

      const zoneInfo = this.informationJson.zone.find(
        (zone) => zone.id === zoneId
      )

      this.infoPane = {
        value: true,
        type: "station",
        info: {
          station: stationInfo,
          line: lineInfo,
          zone: zoneInfo,
          geometry: feature
        },
      };
    },
    onEachFeature(feature, layer) {
      layer.on({
        click: this.onFeatureClick,
      });
    },
    onStationGeoJsonReady() {
      this.featureLayer = this.$refs.geoJson.mapObject;
    },
    onDiagramReady() {
      this.diagram = this.$refs.diagram.mapObject;

      const diagramUrl = "/Oslo_Kollektivkart_2022.svg";
      const bounds = L.latLngBounds([
        [0, 0],
        [0.19636, 0.13889],
      ]);

      L.imageOverlay(diagramUrl, bounds).addTo(this.diagram);

      this.diagram.fitBounds(bounds);

      this.diagram.addEventListener("click", function (ev) {
        console.log(ev);
      });
    },
  },
  created() {
    this.featureJsonOptions = {
      onEachFeature: this.onEachFeature,
    };
  },
};
</script>

<style scoped>
.v-dialog__container {
  display: unset;
}
</style>