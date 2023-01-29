<script setup lang="ts">
  import {IonPage, IonHeader,IonToolbar,IonButtons,IonButton,IonBackButton, IonInput, IonLabel, IonItem,IonList,IonContent, IonFooter, IonTitle} from "@ionic/vue";
  import {onMounted, ref} from "vue"
  import {createConn, db} from '@/helpers/dataBaseConnection'


  const tankProperties = ref({
    name:'',
    number: null,
    parcel: null,
  })

  onMounted(  async () => {
     await createConn()
      await add()

  })

  const add = async () => {
    try {
      const query_1 = `INSERT INTO tank_table VALUES('tank-21',11,2)`
      await db.execute(query_1,false)
    } catch (e) {
      alert('hata')
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
    <ion-button color="success" expand="block" @click="add">Ekle</ion-button>
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
