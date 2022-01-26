<template>
  <ion-text>
    <ion-input placeholder="Enter Tag"/>
    <ion-button fill="clear" id="start-time">16:12</ion-button>
    <ion-button fill="clear" id="end-time">--:--</ion-button>
    <ion-button>Add Time</ion-button>

    <ion-modal trigger="start-time" :show-backdrop="false" :dismiss-on-select="true" side="start" alignment="center">
      <ion-content force-overscroll="false">
        <ion-datetime  presentation="date"/>
        <ion-button fill="clear">Done</ion-button>
      </ion-content>
    </ion-modal>

    <ion-popover trigger="end-time" :show-backdrop="false" :dismiss-on-select="true">
      <ion-content force-overscroll="false">
        <ion-datetime></ion-datetime>
        <ion-button fill="clear">Done</ion-button>
      </ion-content>
    </ion-popover>
  </ion-text>
</template>

<script>
import { IonModal, IonButton, IonContent, IonDatetime, IonPopover } from '@ionic/vue';

export default {
  name: "TrackComponent",
  components: { IonModal, IonButton, IonContent, IonDatetime },
  data: () => ({
    tagInput: null,
    modalBegin: false,
    modalEnd: false,
  }),
}
</script>

<style scoped>

</style>