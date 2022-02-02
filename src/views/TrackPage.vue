<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Timetracker</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <br>
      <!--<ion-button @click="addTestEntry">Add test entry</ion-button>-->

<!--      <ion-modal-->
<!--          :is-open="filterModalOpen"-->
<!--          :swipe-to-close="true"-->
<!--          :presenting-element="$parent.$refs.ionRouterOutlet"-->
<!--          @didDismiss="filterModalOpen = false"-->
<!--      >-->
<!--      &lt;!&ndash;<Modal :data="data"></Modal>&ndash;&gt;-->
<!--      </ion-modal>-->

      <div class="entries-header">
        <ion-title>Getrackte Zeiten</ion-title>
        <ion-button id="filter-button" @click="modalFilter = true" color="dark" fill="clear">
          <ion-icon slot="start" name="filter-outline"></ion-icon>
          Filter&nbsp;
          <ion-badge :color="filtersAreActive ? 'dark' : 'light'">{{filtersAreActive ? '' : 'in'}}active</ion-badge>
        </ion-button>
      </div>

      <div v-if="!(filtersAreActive ? filteredEntries : entries).length" class="no-entries">
        <ion-icon name="sad-outline" style="font-size: 30px; margin-bottom: 15px;"/>
        <span>Keine Einträge</span>
      </div>
      <ion-list v-else>
        <time-entry v-for="timeEntry in (filtersAreActive ? filteredEntries : entries)"
                    :key="timeEntry.tags + timeEntry.startTime + timeEntry.endTime"
                    @delete="deleteEntry(entries.indexOf(timeEntry))"
                    :tags="timeEntry.tags" :from="timeEntry.startTime" :until="timeEntry.endTime"/>
      </ion-list>

      <track-component mode="add" :open="modalAdd" @submit="data => addEntry(data)" @close="modalAdd = false" />
      <track-component mode="edit" :open="modalEdit" @close="modalEdit = false" />
      <track-component mode="filter" :open="modalFilter" @submit="data => setFilters(data)" @close="modalFilter = false" />
    </ion-content>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button id="add-button" @click="modalAdd = true"><ion-icon name="add"></ion-icon></ion-fab-button>
    </ion-fab>
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
      startTime: null,
      endTime: null,
    },
    modalAdd: false,
    modalEdit: false,
    modalFilter: false,
  }),
  async mounted() {
    this.store = new Storage();
    console.log(this.store)
    await this.store.create();
    await this.loadStorage();
  },
  methods: {
    setFilters({ startTime, endTime, tags }) {
      this.activeFilters = {
        startTime: startTime.valueOf(),
        endTime: endTime.valueOf(),
        tags
      };
    },
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
      console.log(this.activeFilters)
      return (this.activeFilters.tags && this.activeFilters.tags.length > 0) || this.activeFilters.startTime || this.activeFilters.endTime;
    },
    filteredEntries() {
      return this.entries
          .filter(entry =>
              (this.activeFilters.tags || this.activeFilters.tags.length || !this.activeFilters.tags.some(tag => !entry.tags.includes(tag)))
              ||
              (this.activeFilters.startTime <= entry.startTime && this.activeFilters.endTime >= entry.endTime)
          );
    }
  }
}
</script>

<style scoped>
.entries-header {
  display: flex;
  justify-content: space-between;
}
.no-entries {
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-style: italic;
  color: grey;
}
</style>
