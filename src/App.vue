<template lang="pug">
v-app#app
  v-main
    router-view
  v-bottom-navigation(
    v-model="currentPage" 
    color="teal"
    height="38"
    horizontal)
    v-btn(value="diagram" to="/")
      span Diagram
      v-icon mdi-map
    v-btn(value="line" to="line")
      span Transport
      v-icon mdi-train
    v-btn(value="about" to="about")
      span About
      v-icon mdi-information
</template>

<script>
export default {
  name: "OsloTransitDiagram2022",
  data: () => ({
    currentPage: 'diagram' 
  })
};
</script>

<style>
html,
body,
#app {
  height: calc(100% + env(safe-area-inset-top));
  margin: 0;

  min-height: calc(100% + env(safe-area-inset-top));
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}

.v-bottom-navigation {
  background-color: #f5f5f5 !important;
}
</style>
