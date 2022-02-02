<template>
  <ion-item-sliding>
    <ion-item lines="full">
      <tag-chips :tags="tags" />
      <p class="dates">{{ formatDate(from, 'dd.MM.') }} bis {{ formatDate(until, 'dd.MM.') }}</p>
      <p>{{ timeInHours }}:{{timeInMinutes}} h</p>
    </ion-item>
    <ion-item-options side="start">
      <ion-item-option color="primary" @click="$emit('editStart')">Edit Start</ion-item-option>
      <ion-item-option color="secondary" @click="$emit('editEnd')">Edit End</ion-item-option>
    </ion-item-options>
    <ion-item-options side="end">
      <ion-item-option color="danger" @click="$emit('delete')">Delete</ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script>
import TagChips from "@/components/TagChips";
import {formatDate} from "@/utils/time";
export default {
  name: "TimeEntry",
  components: {
    TagChips
  },
  props: {
    from: Date,
    until: Date,
    tags: Array,
  },
  emits: [
      "delete",
      "editStart",
      "editEnd",
  ],
  methods: {
    formatDate,
  },
  computed: {
    timeDiff() {
      return this.until - this.from;
    },
    timeInHours() {
      return Math.floor(this.timeDiff / (1000 * 60 * 60));
    },
    timeInMinutes() {
      return Math.floor(this.timeDiff / 1000 / 60) % 60;
    },
  }
}
</script>

<style scoped>

  .input-wrapper {
    display: flex;
  }

  .dates {
    margin-right: 15px;
  }

</style>
