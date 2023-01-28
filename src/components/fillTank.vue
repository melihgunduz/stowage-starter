<script setup lang="ts">
  import {IonPage, IonHeader,IonToolbar,IonButtons,IonButton,IonBackButton, IonItem,IonList,IonContent} from "@ionic/vue";


</script>
<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button/>
      </ion-buttons>
      <ion-title>Fill Tank</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding-vertical">
    <ion-list lines="none">
      <ion-item>
        <ion-select placeholder="Doldurulacak Tankı Seçiniz"></ion-select>
      </ion-item>
    </ion-list>
  </ion-content>
  <ion-footer>
    <ion-button color="success" expand="block">Ekle</ion-button>
  </ion-footer>
</ion-page>
</template>


<style scoped>
#container {
  display: flex;
  flex-direction: column;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}
</style>
