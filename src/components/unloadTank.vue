<script setup lang="ts">
import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonBackButton, IonItem, IonList, IonContent, IonFooter, IonSelect, IonTitle, IonSelectOption, IonRange, IonText, IonCard, IonCardTitle,IonCardHeader,IonCardContent} from "@ionic/vue";
import {createConn,db} from "@/helpers/dataBaseConnection"
import {onMounted, ref} from "vue";


  const fullnessofTank = ref(0)
  const tanks = ref([{
    tankName : null,
    tankNumber : null,
    parcelNumber : null,
  }])
  const getUser = async () => {
    try {
      const query = 'SELECT * FROM tank_table'
      const test = await db.query(query) //use db.query when use SELECT
      const jso = JSON.stringify(test)
      const obj = JSON.parse(jso)

      // for (let i = 0; i < obj.values.length; i++) {
      //   console.log(obj.values[i].tankName)
      // }


      tanks.value = obj.values

      for (let i = 0; i < tanks.value.length; i++) {
        console.log(tanks.value[i].tankName)
      }

    } catch (e) {
      alert('error getting table')
      console.log(e)
    }
  }

  const onIonChange = ({detail}:any) => {
    fullnessofTank.value = detail.value
  }

  onMounted(async () => {
    await createConn()
    await getUser()
  })


</script>
<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button/>
      </ion-buttons>
      <ion-title>Unload Tank</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-card class="ion-no-margin" color="secondary">
      <ion-card-header>
        <ion-card-title>
          Boşaltılacak Tank
        </ion-card-title>
      </ion-card-header>
      <ion-card-content class="ion-no-padding ion-padding-vertical">
        <ion-select class="ion-padding" placeholder="Boşaltılacak Tankı Seçiniz">
          <ion-select-option v-for="tank in tanks" :key="tank" :value="tank">{{tank.tankName}}</ion-select-option>
        </ion-select>
      </ion-card-content>
    </ion-card>
    <ion-card color="medium" class="ion-no-margin ion-margin-top">
      <ion-card-header>
        <ion-card-title>
          Boşaltma Miktarı
        </ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-range @ionChange="onIonChange" class="ion-no-padding" :pin="true">
          <ion-text slot="start">0%</ion-text>
          <ion-text slot="end">100%</ion-text>
        </ion-range>
        <ion-text>Boşaltılan: {{fullnessofTank}}%</ion-text>
      </ion-card-content>
    </ion-card>
    <ion-card color="warning" class="ion-no-margin ion-margin-top">
      <ion-card-header>
        <ion-card-title>
          Tank Bilgileri
        </ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-text>İçerik</ion-text>
      </ion-card-content>
    </ion-card>
  </ion-content>
  <ion-footer>
    <ion-button color="success" expand="block">Boşalt</ion-button>
  </ion-footer>
</ion-page>
</template>


<style scoped>
ion-card {
  box-shadow: none;
}
</style>
