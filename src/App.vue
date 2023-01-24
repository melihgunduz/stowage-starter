<template>
<ion-app>
  <ion-tab-bar slot="bottom">
    <ion-tab-button tab="schedule" href="/home">
      <ion-icon :icon="calendar" aria-hidden="true"></ion-icon>
      <ion-label>Schedule</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="speakers" href="/addTank">
      <ion-icon :icon="personCircle" aria-hidden="true"></ion-icon>
      <ion-label>Speakers</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
  <ion-router-outlet/>
</ion-app>
</template>

<script setup lang="ts">
  import {IonApp,IonIcon,
    IonLabel,
    IonPage,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs} from '@ionic/vue';
  import { calendar, personCircle } from 'ionicons/icons';
</script>
