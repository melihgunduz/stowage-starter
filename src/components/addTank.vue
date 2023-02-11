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
    IonText,
    alertController, toastController, IonSelect
  } from "@ionic/vue";
  import {onMounted, ref} from "vue"
  import {createConn, db} from '@/helpers/dataBaseConnection'
  import {useRouter} from "vue-router";
  import {getTanks} from "@/helpers/getTanksFromDb";


  const $router = useRouter()
  const canBeAdded = ref(false)
  const presentAlert = async () => {
    const alert = await alertController.create({
      header: 'Hata',
      buttons: ['Tamam'],
      message: 'Aynı isime veya numaraya sahip tank bulunmaktadır.\n' +
          'Lütfen yeni bir isim veya numara girin'

    });

    await alert.present();
  };

  const presentToast = async () => {
    const toast = await toastController.create({
      message: 'Tank Oluşturuldu',
      duration: 1500,
      position: "top"
    });

    await toast.present();
  }

  const goods = ref([{
    goodName : null,
    goodNumber : null,
    density: NaN
  }])

  const tanks = ref([{
    tankName : null,
    tankNumber : null,
    parcelNumber : null,
    cargo: null,
    capacity: NaN,
    fullness: NaN,
    weight:NaN
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


  const tankProperties = ref({
    name: null,
    number: null,
    parcel: null,
    cargo: null,
    capacity: NaN,
    fullness: 100,
  })

  const goodDensity = ref(NaN);

  const changed = (event:any) => {
    tankProperties.value.cargo = event.target.value.goodName
    goodDensity.value = event.target.value.density
  }

  onMounted(  async () => {
    await createConn()
    await getGoods()
    await getTanks().then((val) => {
      tanks.value = val
    })
  })

  const add = async () => {
    if (tanks.value.length === 0) {
      try {
        const query_1 = `INSERT INTO tank_table VALUES('${tankProperties.value.name}',
        ${tankProperties.value.number},${tankProperties.value.parcel},'${tankProperties.value.cargo}',
        ${tankProperties.value.capacity},${tankProperties.value.fullness},
        ${(goodDensity.value)  * tankProperties.value.capacity }, ${goodDensity.value})`

        await db.execute(query_1,false)
        await presentToast();
        await $router.replace({name: 'Management'})
        return true

      } catch (e) {
        alert('Tank eklenirken hata oluştu')
        console.log(e)
      }
    } else {
      for (let i = 0; i < tanks.value.length; i++){

        if (tanks.value[i].tankName === tankProperties.value.name || String(tanks.value[i].tankNumber) === String(tankProperties.value.number)) {
          canBeAdded.value = false;
          await presentAlert();
          return false;
        } else {
          canBeAdded.value = true;
        }
      }
      if (canBeAdded.value) {
        try {
          const query_1 = `INSERT INTO tank_table VALUES('${tankProperties.value.name}',
        ${tankProperties.value.number},${tankProperties.value.parcel},'${tankProperties.value.cargo}',
        ${tankProperties.value.capacity},${tankProperties.value.fullness},
        ${(goodDensity.value)  * tankProperties.value.capacity },${goodDensity.value})`

          await db.execute(query_1,false)
          canBeAdded.value = false
          await presentToast();
          await $router.replace({name:'Management'})

        } catch (e) {
          alert('Tank eklenirken hata oluştu')
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
      <ion-title>Add Tank</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-card class="ion-no-margin">
      <ion-list>
        <ion-item>
          <ion-label position="stacked">Tank Adı</ion-label>
          <ion-input color="inputColor" v-model="tankProperties.name" placeholder="Tank Adını Girin"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Tank Numarası</ion-label>
          <ion-input color="inputColor" v-model="tankProperties.number" placeholder="Tank Numarasını Girin" type="number"/>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Tank Parseli</ion-label>
          <ion-input color="inputColor" v-model="tankProperties.parcel" placeholder="Tank Parselini Girin" type="number"/>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Yük</ion-label>
          <ion-select @ionChange="changed($event)" ok-text="Yük Seç" cancel-text="İptal" placeholder="Yüklenilecek Yükü Seçiniz">
            <ion-select-option v-for="good in goods" :key="good" :value="good">{{good.goodName}}</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Kapasite</ion-label>
          <ion-input color="inputColor" v-model="tankProperties.capacity" placeholder="Metreküp Cinsinden Kapasite Girin " type="number"/>
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
ion-label {
  --placeholder-opacity: 80%;
}
ion-input {
  --placeholder-opacity: 80%;
}
ion-select {
  --placeholder-color: #69a8bb;
  --placeholder-opacity: 80%;
  color: #69a8bb;
}
</style>
