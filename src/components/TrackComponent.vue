<template>
  <ion-text>
    <ion-item>
      <ion-label position="fixed">Startzeit</ion-label>
      <ion-button fill="clear" id="begin">{{ beginDate ? formatDateTime(beginDate) : 'Keine Zeit ausgewählt' }}</ion-button>
    </ion-item>

    <ion-item>
      <ion-label position="fixed">Endzeit</ion-label>
      <ion-button fill="clear" id="end">{{ endDate ? formatDateTime(endDate) : 'Keine Zeit ausgewählt' }}</ion-button>
    </ion-item>

    <ion-item>
      <ion-label position="fixed">Tags</ion-label>
      <ion-input placeholder="Enter Tag..." @input="event => tags = event.target.value" />
    </ion-item>

    <tag-chips :tags="tagsList" />

    <ion-button>Add Time</ion-button>

    <date-picker trigger="begin" @input="value => beginDate = value" />
    <date-picker trigger="end" @input="value => endDate = value" />
  </ion-text>
</template>

<script>
import { IonModal, IonButton, IonContent, IonDatetime, IonPopover } from '@ionic/vue';
import DatePicker from "@/components/DatePicker";
import {formatDateTime} from "@/utils/time";
import TagChips from "@/components/TagChips";

export default {
  name: "TrackComponent",
  components: {TagChips, DatePicker, IonButton },
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
      return this.tags ? [...new Set(this.tags.trim().split(/\s+/g))] : [];
    }
  }
}
</script>

<style scoped>
ion-modal {
  /*--height: 500px;*/
}
</style>
