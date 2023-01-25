<script setup lang="ts">
  import {modalController, IonPage, IonHeader,IonToolbar,IonButtons,IonButton} from "@ionic/vue";

  const closeModal = () => {
    modalController.dismiss(null,"cancel")
  }
  const confirm = () => {
    modalController.dismiss(88,"confirm")
  }
</script>


<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="closeModal">Cancel</ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button @click="confirm">Confirm</ion-button>
      </ion-buttons>
      <ion-title>Modal</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    This content was mounted as soon as the modal was created.
  </ion-content>
</ion-page>

</template>


<style scoped>

</style>
