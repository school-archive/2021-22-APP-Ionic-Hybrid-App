<template>
  <ion-item-sliding>
    <ion-item>
      <div class="tags">
        <ion-chip v-for="tag in tags" :key="tag">
          <ion-label>{{ tag }}</ion-label>
        </ion-chip>
      </div>
      <p>{{ timeInHours }}:{{timeInMinutes}}h</p>
      <p>{{ timeDiff / 1000 }}</p>
    </ion-item>
    <ion-item-options side="start">
      <ion-item-option color="primary">Edit Start</ion-item-option>
      <ion-item-option color="secondary">Edit End</ion-item-option>
    </ion-item-options>
    <ion-item-options side="end">
      <ion-item-option color="danger">Delete</ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script>


export default {
  name: "TimeEntry",
  components: {
  },
  props: {
    from: Date,
    until: Date,
    tags: Array,
  },
  computed: {
    timeDiff() {
      return this.until - this.from;
    },
    timeInHours() {
      return Math.floor(this.timeDiff / (1000 * 60 * 60));
    },
    timeInMinutes() {
      return Math.floor(this.timeDiff % 1000 * 60 * 60);
    },
  }
}
</script>

<style scoped>

  .input-wrapper {
    display: flex;
  }
  .tags {
    flex-grow: 1;
  }

</style>