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
    IonRange,
    IonText,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    toastController, alertController
  } from "@ionic/vue";
import {createConn,db} from "@/helpers/dataBaseConnection"
import {onMounted, ref} from "vue";
  import {useRouter} from "vue-router";




  const $router = useRouter()
  const unloadValue = ref(0)

  const tanks = ref([{
    tankName : null,
    tankNumber : null,
    parcelNumber : null,
    cargo: null,
    capacity: NaN,
    fullness: NaN,
    weight:NaN
  }])

  const selectedTank = ref({
    tankName : null,
    tankNumber : null,
    parcelNumber : null,
    cargo: null,
    capacity: NaN,
    fullness: NaN,
    weight:NaN
  })
  const getTanks = async () => {
    try {
      const query = 'SELECT * FROM tank_table'
      const test = await db.query(query) //use db.query when use SELECT
      const jso = JSON.stringify(test)
      const obj = JSON.parse(jso)
      tanks.value = obj.values

    } catch (e) {
      alert('error getting table')
      console.log(e)
    }
  }

  const onIonChange = ({detail}:any) => {
    unloadValue.value = detail.value
  }


  const changed = ({detail}:any) => {
    selectedTank.value = detail.value

  }


  const presentToast = async () => {
    const toast = await toastController.create({
      message: 'Tank Güncellendi',
      duration: 1000,
      position: "top"
    });

    await toast.present();
  }

  const unloadTank = () => {
    const newFullness = ((selectedTank.value.fullness - (selectedTank.value.fullness*unloadValue.value/100))*100) / selectedTank.value.capacity
    const query_1 = "UPDATE tank_table SET fullness = ? WHERE tankName = ?;"
    const query_2 ="UPDATE tank_table SET weight = ? WHERE tankName = ?;"
    db.run(query_1,[`${newFullness}`,`${selectedTank.value.tankName}`])
    // db.run(query_1,[`${selectedTank.value.fullness - (selectedTank.value.fullness*unloadValue.value/100)}`,`${selectedTank.value.tankName}`])
    db.run(query_2,[`${selectedTank.value.weight - (selectedTank.value.weight*unloadValue.value/100)}`,`${selectedTank.value.tankName}`])
  }


  const prepareUnload = async () => {
    const alert = await alertController.create({
      header: 'Uyarı',
      backdropDismiss : false,
      message: `Seçilen tank ${unloadValue.value}% (${(selectedTank.value.weight*unloadValue.value/100)}kg) boşaltılacak. Onaylıyor musunuz?`,
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
              await unloadTank();
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


  onMounted(async () => {
    await createConn()
    await getTanks()
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
    <ion-card class="ion-no-margin" color="select_box">
      <ion-card-header>
        <ion-card-title>
          Boşaltılacak Tank
        </ion-card-title>
      </ion-card-header>
      <ion-card-content class="ion-no-padding ion-padding-vertical">
        <ion-select @ionChange="changed" ok-text="Tank Seç" cancel-text="İptal" class="ion-padding" placeholder="Boşaltılacak Tankı Seçiniz">
          <ion-select-option :disabled="tank.fullness === 0" v-for="tank in tanks" :key="tank" :value="tank">{{tank.tankName}}</ion-select-option>
        </ion-select>
      </ion-card-content>
    </ion-card>
    <ion-card color="tank_info_box" class="ion-no-margin ion-margin-top">
      <ion-card-header>
        <ion-card-title>
          Tank Bilgileri
        </ion-card-title>
      </ion-card-header>
      <ion-card-content v-if="selectedTank.tankName !==null || ''">
          <ion-text>Tank Adı: {{ selectedTank.tankName }}</ion-text>
          <ion-text>Tank Numarası: {{ selectedTank.tankNumber }}</ion-text>
          <ion-text>Parsel Numarası: {{ selectedTank.parcelNumber }}</ion-text>
          <ion-text>Yük: {{ selectedTank.cargo }}</ion-text>
          <ion-text>Kapasite: {{ selectedTank.capacity }} m3</ion-text>
          <ion-text>Doluluk: {{ selectedTank.fullness }} %</ion-text>
          <ion-text>Ağırlık: {{ selectedTank.weight }} kg</ion-text>
      </ion-card-content>
      <ion-card-content v-else>
        <ion-text>Tank bilgisi için tank seçimi yapın</ion-text>
      </ion-card-content>
    </ion-card>
    <ion-card :disabled="!selectedTank.tankName" color="medium" class="ion-no-margin ion-margin-top">
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
        <ion-text>Boşaltılan: {{unloadValue}}%</ion-text>
      </ion-card-content>
    </ion-card>
  </ion-content>
  <ion-footer class="ion-padding ion-no-border">
    <ion-button :disabled="unloadValue === 0" color="success" expand="block" @click="prepareUnload">Boşalt</ion-button>
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
