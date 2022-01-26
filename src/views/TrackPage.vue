<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Der Time Treker</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <track-component/>
<br>
      <ion-button @click="addTestEntry">Add test entry</ion-button>
      <ion-button @click="filterModalOpen = true" color="dark" fill="clear">Filter&nbsp;<ion-badge color="dark">inactive</ion-badge></ion-button>

      <ion-list>
        <ion-list-header>Tracked Time Entries</ion-list-header>
        <time-entry v-for="(timeEntry, i) in this.entries" :key="timeEntry.tags + timeEntry.startTime + timeEntry.endTime"
                    @delete="deleteEntry(i)"
                    :tags="timeEntry.tags" :from="timeEntry.startTime" :until="timeEntry.endTime"/>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import TrackComponent from "@/components/TrackComponent";
import TimeEntry from "@/components/TimeEntry";
import { Storage } from '@ionic/storage';
import {toastController} from "@ionic/vue";

export default {
  name: "TrackPage",
  components: {TimeEntry, TrackComponent},
  data: () => ({
    store: null,
    entries: [],
    filterModalOpen: false,
  }),
  async mounted() {
    this.store = new Storage();
    console.log(this.store)
    await this.store.create();
    await this.loadStorage();
  },
  methods: {
    addTestEntry() {
      this.addEntry({ startTime: new Date(), endTime: new Date(Date.now() + 1000 * 60 * 35 + 1000 * 60 * 60 * 3), tags: ['Tag1','Tag2','Tag3'] })
    },
    async addEntry({ startTime, endTime, tags }) {
      let timeEntry = {
        startTime: startTime.valueOf(),
        endTime: endTime.valueOf(),
        tags
      };
      this.entries.push(timeEntry);
      this.saveStorage();
      const toast = await toastController
          .create({
            message: 'Added time entry.',
            duration: 2000
          })
      return toast.present();
    },
    async deleteEntry(index) {
      this.entries.splice(index, 1);
      this.saveStorage();
      const toast = await toastController
          .create({
            message: 'Deleted time entry.',
            duration: 2000
          })
      return toast.present();
    },
    async saveStorage() {
      await this.store.set("data", JSON.stringify(this.entries))
    },
    async loadStorage() {
      let entries = JSON.parse(await this.store.get("data"));
      console.log(entries)
      if (entries !== null) this.entries = entries;
    }
  }
}
</script>

<style scoped>

</style>