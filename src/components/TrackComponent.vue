<template>
  <ion-text>
    <ion-input placeholder="Enter Tag..." @input="event => tags = event.target.value" />
    <div v-show="tags">
      <ion-chip v-for="tag in tagsList" :key="tag">
        <ion-label>{{ tag }}</ion-label>
      </ion-chip>
    </div>
    <ion-button fill="clear" id="begin">{{ beginDate ? formatDateTime(beginDate) : 'Startzeit' }}</ion-button>
    <ion-button fill="clear" id="end">{{ endDate ? formatDateTime(endDate) : 'Endzeit' }}</ion-button>
    <ion-input></ion-input>

    <ion-button>Add Time</ion-button>

    <date-picker trigger="begin" @input="value => beginDate = value" />
    <date-picker trigger="end" @input="value => endDate = value" />
  </ion-text>
</template>

<script>
import { IonModal, IonButton, IonContent, IonDatetime, IonPopover } from '@ionic/vue';
import DatePicker from "@/components/DatePicker";
import {formatDateTime} from "@/utils/time";

export default {
  name: "TrackComponent",
  components: {DatePicker, IonButton },
  data: () => ({
    tags: '',
    beginDate: null,
    endDate: null,
  }),
  methods: {
    formatDateTime,
  },
  computed: {
    tagsList() {
      console.log(this.tags)
      return [...new Set(this.tags.trim().split(/\s+/g))];
    }
  }
}
</script>

<style scoped>
ion-modal {
  /*--height: 500px;*/
}
</style>
