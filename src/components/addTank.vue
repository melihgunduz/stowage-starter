<script setup lang="ts">
  import {IonPage, IonHeader,IonToolbar,IonButtons,IonButton,IonBackButton, IonInput, IonLabel, IonItem,IonList,IonContent, IonFooter, IonTitle, IonCard, IonText} from "@ionic/vue";
  import {onMounted, ref} from "vue"
  import {createConn, db} from '@/helpers/dataBaseConnection'


  const tankProperties = ref({
    name: null,
    number: null,
    parcel: null,
    cargo: null,
    capacity: NaN,
    fullness: 100,
  })

  onMounted(  async () => {
     await createConn()
  })

  // TODO: Tank ekleme kontrolleri yapılacak
  const add = async () => {
      try {
        const query_1 = `INSERT INTO tank_table VALUES('${tankProperties.value.name}',
        ${tankProperties.value.number},${tankProperties.value.parcel},'${tankProperties.value.cargo}',
        ${tankProperties.value.capacity},${tankProperties.value.fullness},${(tankProperties.value.fullness/100)  * tankProperties.value.capacity })`
        await db.execute(query_1,false)
      } catch (e) {
        alert('Tank eklenirken hata oluştu')
        console.log(e)
      }

  }


</script>



<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button/>
      </ion-buttons>
      <ion-title>Add Tank</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-card class="ion-no-margin">
      <ion-list>
        <ion-item>
          <ion-label position="stacked" color="inputColor">Tank Adı</ion-label>
          <ion-input color="inputColor" v-model="tankProperties.name" placeholder="Tank Adını Girin"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label color="inputColor" position="stacked">Tank Numarası</ion-label>
          <ion-input color="inputColor" v-model="tankProperties.number" placeholder="Tank Numarasını Girin" type="number"/>
        </ion-item>
        <ion-item>
          <ion-label color="inputColor" position="stacked">Tank Parseli</ion-label>
          <ion-input color="inputColor" v-model="tankProperties.parcel" placeholder="Tank Parselini Girin" type="number"/>
        </ion-item>
        <ion-item>
          <ion-label color="inputColor" position="stacked">Yük</ion-label>
          <ion-input color="inputColor" v-model="tankProperties.cargo" placeholder="Yüklenecek Yükü Yazın" type="text"/>
        </ion-item>
        <ion-item>
          <ion-label color="inputColor" position="stacked">Kapasite</ion-label>
          <ion-input color="inputColor" v-model="tankProperties.capacity" placeholder="Metreküp cinsinden kapasite girin " type="number"/>
        </ion-item>
      </ion-list>
    </ion-card>
  </ion-content>
    <ion-text class="ion-padding" color="note">Not: Eklenen tank otomatik olarak 100% dolulukta eklenecektir.</ion-text>
  <ion-footer class="ion-padding">
    <ion-button color="success" expand="block" @click="add">Ekle</ion-button>
  </ion-footer>
</ion-page>
</template>


<style scoped>
ion-card {
  box-shadow: none;
}
</style>
