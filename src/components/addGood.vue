<script setup lang="ts">
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonBackButton,
    IonInput,
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    IonFooter,
    IonTitle,
    IonCard,
    alertController, toastController
  } from "@ionic/vue";
  import {onMounted, ref} from "vue"
  import {createConn, db} from '@/helpers/dataBaseConnection'
  import {useRouter} from "vue-router";


  const $router = useRouter()
  const canBeAdded = ref(false)
  const presentAlert = async () => {
    const alert = await alertController.create({
      header: 'Hata',
      buttons: ['Tamam'],
      message: 'Aynı isime veya numaraya sahip yük bulunmaktadır.\n' +
          'Lütfen yeni bir isim veya numara girin'

    });

    await alert.present();
  };

  const presentToast = async () => {
    const toast = await toastController.create({
      message: 'Yük Oluşturuldu',
      duration: 1000,
      position: "top"
    });

    await toast.present();
  }


  const goods = ref([{
    goodName : null,
    goodNumber : null,
    density: NaN
  }])

  const getGoods = async () => {
    try {
      const query = 'SELECT * FROM goods_table'
      const answerFromDb = await db.query(query) //use db.query when use SELECT
      const goodsAsText = JSON.stringify(answerFromDb)
      const goodsFromDb = JSON.parse(goodsAsText)
      goods.value = goodsFromDb.values
    } catch (e) {
      alert('error getting table')
      console.log(e)
    }
  }


  const goodProperties = ref({
    name: null,
    number: null,
    density: NaN,
  })

  onMounted(  async () => {
     await createConn()
     await getGoods()
  })

  const add = async () => {
    if (goods.value.length === 0) {
      try {
        const query_1 = `INSERT INTO goods_table VALUES('${goodProperties.value.name}',
        ${goodProperties.value.number},${goodProperties.value.density})`

        await db.execute(query_1,false)
        await presentToast();
        await $router.replace({name: 'Management'})
        return true

      } catch (e) {
        alert('Yük kaydedilirken hata oluştu')
        console.log(e)
      }
    } else {
      for (let i = 0; i < goods.value.length; i++){

        if (goods.value[i].goodName === goodProperties.value.name || String(goods.value[i].goodNumber) === String(goodProperties.value.number)) {
          canBeAdded.value = false;
          await presentAlert();
          return false;
        } else {
          canBeAdded.value = true;
        }
      }
      if (canBeAdded.value) {
        try {
          const query_1 = `INSERT INTO goods_table VALUES('${goodProperties.value.name}',
        ${goodProperties.value.number},${goodProperties.value.density})`

          await db.execute(query_1,false)
          canBeAdded.value = false
          await presentToast();
          await $router.replace({name:'Management'})

        } catch (e) {
          alert('Yük kaydedilirken hata oluştu')
          console.log(e)
        }
      }
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
      <ion-title>Add Good</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-card class="ion-no-margin">
      <ion-list>
        <ion-item>
          <ion-label position="stacked" color="inputColor">Yük Adı</ion-label>
          <ion-input color="inputColor" v-model="goodProperties.name" placeholder="Yük Adını Girin"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label color="inputColor" position="stacked">Yük Numarası</ion-label>
          <ion-input color="inputColor" v-model="goodProperties.number" placeholder="Yük Numarasını Girin" type="number"/>
        </ion-item>
        <ion-item>
          <ion-label color="inputColor" position="stacked">Yük Yoğunluğu (kg/m3)</ion-label>
          <ion-input color="inputColor" v-model="goodProperties.density" placeholder="Yük Yoğunluğunu Girin" type="number"/>
        </ion-item>
      </ion-list>
    </ion-card>
  </ion-content>
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
