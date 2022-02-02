<template>
  <ion-text>
    <ion-item lines="full">
      <ion-label position="fixed">Startzeit</ion-label>
      <ion-button fill="clear" id="begin">{{ beginDate ? formatDateTime(beginDate) : 'Keine Startzeit ausgewählt' }}</ion-button>
    </ion-item>

    <ion-item lines="full">
      <ion-label position="fixed">Endzeit</ion-label>
      <ion-button fill="clear" id="end">{{ endDate ? formatDateTime(endDate) : 'Keine Endzeit ausgewählt' }}</ion-button>
    </ion-item>

    <ion-item lines="none">
      <ion-label position="fixed">Tags</ion-label>
      <ion-input placeholder="Tags eingeben..." @input="event => tags = event.target.value" />
    </ion-item>

    <ion-item lines="full">
      <ion-label position="fixed"></ion-label>
      <tag-chips :tags="tagsList" />
    </ion-item>

    <div class="add">
      <ion-button class="add-button"><ion-icon slot="start" name="add"></ion-icon>Zeit hinzufügen</ion-button>
    </div>

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
.add-button {
  margin: 10px;
}
.add {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>
