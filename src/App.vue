<template>
  <ion-app>
<!--    <ion-router-outlet />-->
  <track-page />

<!--    <ion-fab vertical="bottom" horizontal="end">-->
<!--      <ion-button><ion-icon name="add"></ion-icon></ion-button>-->
<!--    </ion-fab>-->
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import TrackPage from "@/views/TrackPage.vue";

export default defineComponent({
  name: 'App',
  components: {
    TrackPage,
    IonApp,
    // IonRouterOutlet
  }
});
</script>

<style>

</style>
