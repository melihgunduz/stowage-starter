<script setup lang="ts">
  import {IonPage, IonHeader,IonToolbar,IonButtons,IonBackButton, IonInput, IonLabel, IonItem,IonList,IonContent} from "@ionic/vue";
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
        <ion-label >
          <h4>Tank Adını Girin</h4>
          <ion-input class="ion-margin-start" type="text"/>

        </ion-label>
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
