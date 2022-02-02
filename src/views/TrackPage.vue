<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Der Time Trekker</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <track-component @add="data => addEntry(data)" />
      <br>
      <ion-button @click="addTestEntry">Add test entry</ion-button>
      <ion-button @click="filterModalOpen = true" color="dark" fill="clear">Filter&nbsp;<ion-badge :color="filtersAreActive ? 'dark' : 'light'">{{filtersAreActive ? '' : 'in'}}active</ion-badge></ion-button>

      <ion-modal
          :is-open="filterModalOpen"
          :swipe-to-close="true"
          :presenting-element="$parent.$refs.ionRouterOutlet"
          @didDismiss="filterModalOpen = false"
      >
<!--        <Modal :data="data"></Modal>-->
      </ion-modal>

      <ion-list>
        <ion-list-header>Tracked Time Entries</ion-list-header>
        <time-entry v-for="timeEntry in (filtersAreActive ? filteredEntries : entries)"
                    :key="timeEntry.tags + timeEntry.startTime + timeEntry.endTime"
                    @delete="deleteEntry(entries.indexOf(timeEntry))"
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
    activeFilters: {
      tags: [],
      date: null,
    },
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
      this.entries.unshift(timeEntry);
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
  },
  computed: {
    filtersAreActive() {
      return (this.activeFilters.tags !== null && this.activeFilters.tags.length > 0) || this.activeFilters.date !== null;
    },
    filteredEntries() {
      return this.entries
          .filter(entry =>
            (this.activeFilters.tags === null || this.activeFilters.tags.length === 0 || ! this.activeFilters.tags.some(tag => ! entry.tags.contains(tag))) &&
              (this.activeFilters.date === null ||
                  this.activeFilters.date % (24 * 60 * 60 * 1000) >= entry.startDate % (24 * 60 * 60 * 1000) &&
                  this.activeFilters.date % (24 * 60 * 60 * 1000) <= entry.endDate % (24 * 60 * 60 * 1000)
              )
          );
    }
  }
}
</script>

<style scoped>

</style>
