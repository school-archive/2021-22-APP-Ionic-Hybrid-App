<template>
  <div v-if="tags.length" class="tags">
    <span class="chip" v-for="tag in tags" :key="tag">{{ tag }}</span>
  </div>
  <div v-else class="no-tags">
    Keine Tags ausgewählt
  </div>
</template>

<script>
export default {
  name: "TagChips",
  props: {
    tags: Array,
  }
}
</script>

<style scoped>
.tags {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
}
.no-tags {
  font-style: italic;
  color: grey;
  padding: 10px;
}
.chip {
  color: black;
  background-color: #D6D6D6;
  border-radius: 20px;
  padding: 5px;
  margin: 2px;
}
@media (prefers-color-scheme: dark) {
  .chip {
    color: white;
    background-color: grey;
  }
}
</style>
