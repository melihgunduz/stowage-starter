<script setup lang="ts">
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonBackButton,
    IonContent,
    IonFooter,
    IonSelect,
    IonTitle,
    IonSelectOption,
    IonText,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    toastController, alertController
  } from "@ionic/vue";
  import {onMounted, ref} from "vue"
  import {createConn, db} from '@/helpers/dataBaseConnection'
  import {useRouter} from "vue-router";


  const $router = useRouter()

  const goods = ref([{
    goodName : null,
    goodNumber : null,
    density: NaN
  }])

  const selectedGood = ref({
    goodName : null,
    goodNumber : null,
    density: NaN
  })

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

  const changed = ({detail}:any) => {
    selectedGood.value = detail.value
  }


  const presentToast = async () => {
    const toast = await toastController.create({
      message: 'Yük Silindi',
      duration: 1000,
      position: "top"
    });

    await toast.present();
  }

  const removeFromDatabase = () => {
    const query = "DELETE FROM goods_table WHERE goodName = ?;"
    db.run(query,[`${selectedGood.value.goodName}`])
  }

  const prepareRemove = async () => {
    const alert = await alertController.create({
      header: 'Uyarı',
      backdropDismiss : false,
      message: `Seçilen yük silinecek. Onaylıyor musunuz?`,
      buttons: [
        {
          text: 'Vazgeç',
          role: 'cancel',
        },
        {
          text: 'Onayla',
          role: 'confirm',
          handler: async () => {
            try {
              await removeFromDatabase();
              await presentToast();
              await $router.replace({name: 'Management'});
            }catch (e){
              console.log(e)
            }
          }
        },
      ],
    });
    await alert.present();
  }


  onMounted(  async () => {
     await createConn()
     await getGoods()
  })


</script>



<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button/>
      </ion-buttons>
      <ion-title>Delete Good</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-card class="ion-no-margin" color="select_box">
      <ion-card-header>
        <ion-card-title>
          Silinecek Yük
        </ion-card-title>
      </ion-card-header>
      <ion-card-content class="ion-no-padding ion-padding-vertical">
        <ion-select @ionChange="changed" ok-text="Yük Seç" cancel-text="İptal" class="ion-padding" placeholder="Silinecek Yükü Seçiniz">
          <ion-select-option v-for="good in goods" :key="good" :value="good">{{good.goodName}}</ion-select-option>
        </ion-select>
      </ion-card-content>
    </ion-card>
    <ion-card color="tank_info_box" class="ion-no-margin ion-margin-top">
      <ion-card-header>
        <ion-card-title>
          Yük Bilgileri
        </ion-card-title>
      </ion-card-header>
      <ion-card-content v-if="selectedGood.goodName !==null || ''">
        <ion-text>Yük Adı: {{ selectedGood.goodName }}</ion-text>
        <ion-text>Yük Numarası: {{ selectedGood.goodNumber }}</ion-text>
        <ion-text>Yük Yoğunluğu: {{ selectedGood.density }}</ion-text>
      </ion-card-content>
      <ion-card-content v-else>
        <ion-text>Yük bilgisi için listeden seçim yapın</ion-text>
      </ion-card-content>
    </ion-card>
  </ion-content>
  <ion-footer class="ion-padding ion-no-border">
    <ion-button :disabled="selectedGood.goodName === null" color="danger" expand="block" @click="prepareRemove">Sil</ion-button>
  </ion-footer>
</ion-page>
</template>


<style scoped>
ion-card {
  box-shadow: none;
}

ion-card-content {
  display: flex;
  flex-direction: column;
}

ion-select {
  --placeholder-color: black;
  --placeholder-opacity: 80%;
}
</style>
