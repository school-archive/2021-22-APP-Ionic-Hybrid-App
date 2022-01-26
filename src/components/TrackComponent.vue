<template>
  <ion-text>
    <ion-input placeholder="Enter Tag"/>
    <ion-button fill="clear" id="begin">{{ beginDate ? formatDateTime(beginDate) : 'Startzeit' }}</ion-button>
    <ion-button fill="clear" id="end">{{ endDate ? formatDateTime(endDate) : 'Endzeit' }}</ion-button>
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
    tagInput: null,
    modalBegin: false,
    modalEnd: false,
    beginDate: null,
    endDate: null,
  }),
  methods: {
    formatDateTime,
  }
}
</script>

<style scoped>
ion-modal {
  /*--height: 500px;*/
}
</style>
