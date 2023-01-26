<script setup lang="ts">
  import {IonPage, IonHeader,IonToolbar,IonButtons,IonBackButton, IonInput, IonIcon} from "@ionic/vue";
  import {arrowBack} from "ionicons/icons";
  import {useRoute} from "vue-router";


  const $route = useRoute();

  const actionType = ($route.params.action)

</script>


<template>
<ion-page v-if="actionType==='add'">
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button/>
      </ion-buttons>
      <ion-title>Back Button</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding-vertical">
    <ion-list>
      <ion-item>
        <ion-label position="stacked" >Tank Adını Girin</ion-label>
        <ion-input class="ion-margin-start" type="text"/>
      </ion-item>
      <ion-item>
        <ion-input placeholder="Tank Numarasını Girin" type="number"/>
      </ion-item>
      <ion-item>
        <ion-input placeholder="Tank Parselini Girin" type="number"/>
      </ion-item>
    </ion-list>
  </ion-content>
</ion-page>

</template>


<style scoped>

</style>
