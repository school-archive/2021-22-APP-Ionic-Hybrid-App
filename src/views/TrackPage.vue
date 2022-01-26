<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Der Time Treker</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <track-component/>

      <ion-list>
        <ion-list-header>Tracked Time Entries</ion-list-header>
        <time-entry :tags="['Tag1','Tag2','Tag3']" :from="new Date()" :until="new Date(Date.now() + 1000 * 60 * 35 + 1000 * 60 * 60 * 3)"/>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import TrackComponent from "@/components/TrackComponent";
import TimeEntry from "@/components/TimeEntry";
export default {
  name: "TrackPage",
  components: {TimeEntry, TrackComponent}
}
</script>

<style scoped>

</style>