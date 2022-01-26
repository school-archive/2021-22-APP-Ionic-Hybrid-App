<template>
  <ion-modal :trigger="trigger" :show-backdrop="true" :breakpoints="[0.0, 0.7, 0.95]" :initialBreakpoint="0.7">
    <ion-content force-overscroll="false">
      <ion-datetime :value="value" presentation="date-time" size="cover" @ionChange="event => $emit('input', event.detail.value)">
        <div slot="title">Select time and date</div>
      </ion-datetime>
    </ion-content>
  </ion-modal>
</template>

<script>
import { IonModal, IonContent, IonDatetime } from '@ionic/vue';

export default {
  name: "DatePicker",
  components: {IonModal, IonContent, IonDatetime},
  props: {
    value: String,
    trigger: String,
  }
}
</script>

<style scoped>
ion-modal {
  /*--height: 500px;*/
}
</style>
