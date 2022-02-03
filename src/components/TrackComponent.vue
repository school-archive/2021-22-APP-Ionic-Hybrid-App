<template>
  <ion-modal :trigger="trigger" :is-open="open" :breakpoints="[0.0, 0.7, 0.95]" :initialBreakpoint="0.7" @didDismiss="mode === 'filter' ? $emit('close') : clear()">
<!--    <ion-content force-overscroll="false">-->
      <div>
<!--        <ion-toolbar>-->
          <h5 class="title ion-margin ion-margin-bottom">{{ getByMode('Neue Zeit', 'Zeit bearbeiten', 'Filter') }}</h5>
<!--        </ion-toolbar>-->

        <ion-item lines="full">
          <ion-label position="fixed">Startzeit</ion-label>
          <ion-button fill="clear" :id="getIdByMode('begin')">{{ beginDate ? formatDateTime(beginDate) : 'Keine Startzeit ausgewählt' }}</ion-button>
        </ion-item>

        <ion-item lines="full">
          <ion-label position="fixed">Endzeit</ion-label>
          <ion-button fill="clear" :id="getIdByMode('end')">{{ endDate ? formatDateTime(endDate) : 'Keine Endzeit ausgewählt' }}</ion-button>
        </ion-item>

        <ion-item lines="none">
          <ion-label position="fixed">Tags</ion-label>
          <input class="input" placeholder="Tags eingeben..." :value="tags" @input="event => tags = event.target.value" />
        </ion-item>

        <ion-item lines="full">
          <ion-label position="fixed"></ion-label>
          <tag-chips :tags="tagsList" />
        </ion-item>

        <div class="add">
          <ion-button @click="mode === 'filter' ? $emit('close') : clear()" class="add-button" color="medium">
            <ion-icon slot="start" name="close-outline"></ion-icon>
            Abbrechen
          </ion-button>
          <ion-button @click="addEntry()" :disabled="isDisabled" class="add-button">
            <ion-icon slot="start" :name="getByMode('add-outline', 'checkmark-outline', 'flash-outline')"></ion-icon>
            {{ getByMode('Zeit hinzufügen', 'Zeit aktualisieren', 'Filter anwenden') }}
          </ion-button>
        </div>

        <div v-if="mode === 'filter'" class="filter-delete">
          <ion-button @click="() => { clear(); addEntry(); }" class="add-button" color="tertiary">
            <ion-icon slot="start" name="trash-outline"></ion-icon>
            Filter löschen
          </ion-button>
        </div>

        <date-picker :trigger="getIdByMode('begin')" @input="value => beginDate = value" />
        <date-picker :trigger="getIdByMode('end')" @input="value => endDate = value" />
      </div>
<!--    </ion-content>-->
  </ion-modal>
</template>

<script>
import { IonModal, IonButton, IonContent, IonDatetime, IonPopover } from '@ionic/vue';
import DatePicker from "@/components/DatePicker";
import {formatDateTime, toDate} from "@/utils/time";
import TagChips from "@/components/TagChips";

export default {
  name: "TrackComponent",
  components: {TagChips, DatePicker, IonButton },
  props: {
    mode: {
      type: String, // add, edit, filter
      default: 'add'
    },
    trigger: String,
    open: Boolean,
  },
  data: () => ({
    tags: '',
    beginDate: null,
    endDate: null,
  }),
  methods: {
    formatDateTime,
    addEntry() {
      const beginDate = toDate(this.beginDate);
      const endDate = toDate(this.endDate);
      const inverse = beginDate > endDate;
      this.$emit('submit', {
        tags: this.tagsList,
        startTime: inverse ? endDate : beginDate,
        endTime: inverse ? beginDate : endDate,
      });
      if(this.mode === 'filter') {
        this.$emit('close');
      } else {
        this.clear();
      }
    },
    clear() {
      this.tags = '';
      this.beginDate = null;
      this.endDate = null;
      this.$emit('close');
    },
    getByMode(add, edit, filter) {
      return  this.mode === 'add' ? add :
              this.mode === 'edit' ? edit :
              this.mode === 'filter' ? filter : 'Unbekannter Modus';
    },
    getIdByMode(id) {
      return `${this.mode}-${id}`; // so that trigger does not open other track-component modals too
    }
  },
  computed: {
    tagsList() {
      return this.tags ? [...new Set(this.tags.trim().split(/\s+/g))] : [];
    },
    isDisabled() {
      return this.mode === 'filter' ?
          !(this.tags || this.beginDate || this.endDate) :
          !(this.tags && this.beginDate && this.endDate);
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
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 10px;
}
.filter-delete {
  display: flex;
  justify-content: flex-end;
  margin-top: -20px;
}
.title {
  margin-top: 20px;
  margin-bottom: 10px;
}
.input {
  border: none;
  background-color: transparent;
  padding: 10px;
}
.input:focus {
  outline: none!important;
}
</style>
