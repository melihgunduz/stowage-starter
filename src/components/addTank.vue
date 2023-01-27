<script setup lang="ts">
  import {IonPage, IonHeader,IonToolbar,IonButtons,IonButton,IonBackButton, IonInput, IonLabel, IonItem,IonList,IonContent} from "@ionic/vue";
  import {useRoute} from "vue-router";
  import {ref} from "vue"


  const $route = useRoute();

  const actionType = ($route.params.action)
  const tankProperties = ref({
    name:'',
    number: null,
    parcel: null,
  })

</script>



<template>
<ion-page>
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
        <ion-label position="floating" :color="tankProperties.name !== '' ? 'success' : 'danger'">Tank Adı</ion-label>
        <ion-input v-model="tankProperties.name" placeholder="Tank Adını Girin"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label :color="tankProperties.number !== null && tankProperties.number !== '' && typeof tankProperties.number!== 'undefined'  ? 'success' : 'danger'" position="floating">Tank Numarası</ion-label>
        <ion-input v-model="tankProperties.number" placeholder="Tank Numarasını Girin" type="number"/>
      </ion-item>
      <ion-item>
        <ion-label :color="tankProperties.parcel !== null && tankProperties.parcel !== '' && typeof tankProperties.parcel!== 'undefined' ? 'success' : 'danger'" position="floating">Tank Parseli</ion-label>
        <ion-input v-model="tankProperties.parcel" placeholder="Tank Parselini Girin" type="number"/>
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
