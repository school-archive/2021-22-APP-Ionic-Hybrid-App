<template>
  <ion-item-sliding>
    <ion-item lines="full" class="entry">
      <div style="max-width: calc(100% - 180px - 50px);" slot="start"><tag-chips :tags="tags" /></div>
      <div slot="end" style="display: flex; flex-direction: column; align-items: end">
        <div style="margin-bottom: 2px;"><ion-icon name="exit"></ion-icon> {{ formatDate(from) }}</div>
        <div style="margin-bottom: 2px;"><ion-icon name="enter"></ion-icon> {{ formatDate(until) }}</div>
        <div><ion-icon name="time"></ion-icon> {{ timeInHours }}:{{timeInMinutes}} h</div>
      </div>
      <ion-button slot="end" fill="clear" color="danger" style="margin: 0; margin-left: 10px;" @click="$emit('delete')">
        <ion-icon slot="icon-only" name="close-outline"></ion-icon>
      </ion-button>
    </ion-item>
<!--    <ion-item-options side="start">-->
<!--      <ion-item-option color="primary" @click="$emit('editStart')">Edit Start</ion-item-option>-->
<!--      <ion-item-option color="secondary" @click="$emit('editEnd')">Edit End</ion-item-option>-->
<!--    </ion-item-options>-->
<!--    <ion-item-options side="end">-->
<!--      <ion-item-option color="danger" @click="$emit('delete')">Delete</ion-item-option>-->
<!--    </ion-item-options>-->
  </ion-item-sliding>
</template>

<script>
import TagChips from "@/components/TagChips";
import {formatDate} from "@/utils/time";
import IonItemOption from "@ionic/vue"
import IonItemOptions from "@ionic/vue"
export default {
  name: "TimeEntry",
  components: {
    TagChips,
    // IonItemOption,
    // IonItemOptions,
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
