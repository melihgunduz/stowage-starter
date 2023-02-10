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




  const filledVolume = ref(NaN);
  const currentUnloadedVolume = ref(0);

  const $router = useRouter()
  const unloadValue = ref(0)

  const tanks = ref([{
    tankName : null,
    tankNumber : null,
    parcelNumber : null,
    cargo: null,
    capacity: NaN,
    fullness: NaN,
    weight:NaN,
    goodDensity: NaN
  }])

  const selectedTank = ref({
    tankName : null,
    tankNumber : null,
    parcelNumber : null,
    cargo: null,
    capacity: NaN,
    fullness: NaN,
    weight:NaN,
    goodDensity: NaN
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
    currentUnloadedVolume.value = Number((filledVolume.value*unloadValue.value/100).toFixed(2))
  }


  const changed = ({detail}:any) => {
    selectedTank.value = detail.value

    filledVolume.value = Number((selectedTank.value.capacity * selectedTank.value.fullness/100).toFixed(2))

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
    const newFilledVolume = filledVolume.value - (filledVolume.value * unloadValue.value/100)
    const newFullness = ((newFilledVolume) / selectedTank.value.capacity)*100
    const newWeight = (newFilledVolume * selectedTank.value.goodDensity)
    const query_1 = "UPDATE tank_table SET fullness = ? WHERE tankName = ?;"
    const query_2 ="UPDATE tank_table SET weight = ? WHERE tankName = ?;"
    db.run(query_1,[`${newFullness}`,`${selectedTank.value.tankName}`])
    db.run(query_2,[`${newWeight}`,`${selectedTank.value.tankName}`])
  }


  const prepareUnload = async () => {
    const alert = await alertController.create({
      header: 'Uyarı',
      backdropDismiss : false,
      message: `Seçilen tank ${unloadValue.value}% (${(selectedTank.value.weight * unloadValue.value/100)}kg) boşaltılacak. Onaylıyor musunuz?`,
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
    <ion-card id="info-card" color="tank_info_box" class="ion-no-margin ion-margin-top">
      <ion-card-header>
        <ion-card-title>
          Tank Bilgileri
        </ion-card-title>
      </ion-card-header>
      <ion-card-content v-if="selectedTank.tankName !==null || ''">
        <div id="left">
          <ion-text>Tank Adı: <ion-text color="success">{{ selectedTank.tankName }}</ion-text></ion-text>
          <ion-text>Tank Numarası: <ion-text color="success">{{ selectedTank.tankNumber }}</ion-text></ion-text>
          <ion-text>Parsel Numarası: <ion-text color="success">{{ selectedTank.parcelNumber }}</ion-text></ion-text>
          <ion-text>Yük: <ion-text color="success">{{ selectedTank.cargo }}</ion-text></ion-text>
        </div>
        <div id="right">
          <ion-text>Kapasite: <ion-text color="success">{{ selectedTank.capacity }} m3</ion-text></ion-text>
          <ion-text>Dolu Hacim: <ion-text color="success">{{filledVolume}} m3</ion-text></ion-text>
          <ion-text>Ağırlık: <ion-text color="success">{{ selectedTank.weight.toFixed(2) }} kg</ion-text></ion-text>
          <ion-text>Doluluk: <ion-text color="success">{{ (selectedTank.fullness).toFixed(2) }}%</ion-text></ion-text>
        </div>
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
        <ion-text>Boşaltılan: {{unloadValue}}%, {{currentUnloadedVolume}} m3</ion-text>
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
#info-card ion-card-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

#left {
  display: flex;
  flex-direction: column;
}

#right {
  display: flex;
  flex-direction: column;
}
#right ion-text{
  justify-content: flex-end;
}

ion-select {
  --placeholder-color: black;
  --placeholder-opacity: 80%;
}
</style>
