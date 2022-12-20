<template lang="pug">
#search-bar
  .font-weight-black Oslo Transit Diagram 2022
  v-text-field(v-model="keyword" solo dense hide-hint label="Search for station")
</template>

<script>
export default {
  data: () => ({
    keyword: ''
  })
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