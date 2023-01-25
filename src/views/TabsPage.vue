<script setup lang="ts">
  import {IonIcon, IonPage, IonRouterOutlet, IonTabs, IonTabBar,IonTabButton} from "@ionic/vue";
  import {buildOutline, cubeOutline} from "ionicons/icons";
</script>

<template>
<ion-page>
  <ion-tabs>
    <ion-router-outlet/>
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="tanks" href="/home">
        <ion-icon :icon="cubeOutline" aria-hidden="true"></ion-icon>
        <ion-label>Warehouse</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="speakers" href="/manage">
        <ion-icon :icon="buildOutline" aria-hidden="true"></ion-icon>
        <ion-label>Management</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</ion-page>
</template>
