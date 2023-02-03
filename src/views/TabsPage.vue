<script setup lang="ts">
  import {IonIcon, IonPage, IonRouterOutlet, IonTabs, IonTabBar,IonTabButton, IonLabel} from "@ionic/vue";
  import {buildOutline, cubeOutline} from "ionicons/icons";
</script>

<template>
<ion-page>
  <ion-tabs>
    <ion-router-outlet/>
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="warehouse" href="/tabs/warehouse">
        <ion-icon :icon="cubeOutline" aria-hidden="true"></ion-icon>
        <ion-label>Warehouse</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="management" href="/tabs/management">
        <ion-icon :icon="buildOutline" aria-hidden="true"></ion-icon>
        <ion-label>Management</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</ion-page>
</template>
