<template>
  <div v-if="tags.length" class="tags">
    <ion-chip v-for="tag in tags" :key="tag">
      <ion-label>{{ tag }}</ion-label>
    </ion-chip>
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
  flex-grow: 1;
}
.no-tags {
  font-style: italic;
  color: grey;
  padding: 10px;
}
</style>
