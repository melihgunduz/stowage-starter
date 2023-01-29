<script setup lang="ts">
import {IonPage, IonHeader,IonToolbar,IonButtons,IonButton,IonBackButton, IonItem,IonList,IonContent, IonFooter,IonSelect,IonTitle,IonSelectOption} from "@ionic/vue";
import {createConn,db} from "@/helpers/dataBaseConnection"
import {onMounted, ref} from "vue";



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
      <ion-title>Fill Tank</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding-vertical">
    <ion-list lines="none">
      <ion-item>
        <ion-select placeholder="Doldurulacak Tankı Seçiniz">
          <ion-select-option v-for="tank in tanks" :key="tank">{{tank.tankName}}</ion-select-option>
        </ion-select>
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
