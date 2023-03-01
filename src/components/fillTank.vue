<script setup>
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
  import {createConn,db,getTanks} from "@/helpers/dataBaseFunctions"
  import { onMounted, ref} from "vue";
  import {useRouter} from "vue-router";
  import {appAlertController} from "@/helpers/alertController";
  import { setGroupsWeight, getGroupS, getGroupP} from "@/helpers/groupWeightController"

  let filledVolume = 0
  let newFullVolume = 0
  let newWeight = NaN;
  const newFullness = ref(NaN);
  const canBeFilledVolume = ref(NaN);

  const $router = useRouter()
  const loadValue = ref(0)

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


  const tankChanged = ({detail}) => {
    selectedTank.value = detail.value
    filledVolume = Number((selectedTank.value.weight / selectedTank.value.goodDensity).toFixed(2))
    canBeFilledVolume.value = Number(((selectedTank.value.capacity*98/100) - filledVolume).toFixed(2))
    newFullness.value = Number((selectedTank.value.fullness).toFixed(2))
  }

  const onRangeChanged = ({detail}) => {
    loadValue.value = detail.value

    if (selectedTank.value.weight === 0) {
      newWeight = (selectedTank.value.capacity * (loadValue.value/100)) * selectedTank.value.goodDensity
    } else {
      const emptyVolume = selectedTank.value.capacity - selectedTank.value.capacity * (selectedTank.value.fullness/100)
      newWeight = selectedTank.value.weight + ((emptyVolume * loadValue.value/100) * selectedTank.value.goodDensity)
    }
    newFullVolume = Number((canBeFilledVolume.value*loadValue.value/100).toFixed(2))
    newFullness.value = Number((selectedTank.value.fullness+(newFullVolume / selectedTank.value.capacity)*100).toFixed(2))
  }



  const presentToast = async () => {
    const toast = await toastController.create({
      message: 'Tank Güncellendi',
      duration: 1000,
      position: "top"
    });

    await toast.present();
  }


  const loadTank = () => {
    const query_1 = "UPDATE tank_table SET fullness = ? WHERE tankName = ?;"
    const query_2 ="UPDATE tank_table SET weight = ? WHERE tankName = ?;"
    db.run(query_1,[`${Number((newFullness.value).toFixed(2))}`,`${selectedTank.value.tankName}`])
    db.run(query_2,[`${Number((newWeight).toFixed(2))}`,`${selectedTank.value.tankName}`])

  }

  const prepareLoad = async () => {
    const emptyVolume = selectedTank.value.capacity - selectedTank.value.capacity * (selectedTank.value.fullness/100) // kalan hacim
    if(newFullness.value < 50) {
      const alert = await alertController.create({
        header: 'test'
      })
      await alert.present();
    } else {
      await appAlertController('Uyarı',
          `Seçilen tank ${loadValue.value}% (${((emptyVolume * loadValue.value / 100) * selectedTank.value.goodDensity).toFixed(2)}kg, ${newFullVolume}m3) doldurulacak. Onaylıyor musunuz?`)
          .then( async (val) => {
            if (val === 'confirm') {
              try {
                await loadTank();
                await presentToast();
                await $router.replace({name: 'Management'});
              } catch (e) {
                alert('fonksiyonlar başarısız oldu')
                console.log(e)
              }
            }
          })
    }

  }

  onMounted(async () => {
    await createConn()
    await getTanks().then((val) => {
      tanks.value = val
    })
    await setGroupsWeight();
    await getGroupS().then((val) => console.log(val));
    await getGroupP().then((val) => console.log(val));

  })

</script>

<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button/>
      </ion-buttons>
      <ion-title>Load Tank</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-card class="ion-no-margin" color="select_box">
      <ion-card-header>
        <ion-card-title>
          Doldurulacak Tank
        </ion-card-title>
      </ion-card-header>
      <ion-card-content class="ion-no-padding ion-padding-vertical">
        <ion-select @ionChange="tankChanged" ok-text="Tank Seç" cancel-text="İptal" class="ion-padding" placeholder="Doldurulacak Tankı Seçiniz">
          <ion-select-option v-for="tank in tanks" :key="tank" :value="tank">{{tank.tankName}}</ion-select-option>

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
          <ion-text>Kapasite: <ion-text color="success">{{ selectedTank.capacity }} m3</ion-text></ion-text>
          <ion-text>Ağırlık: <ion-text color="success">{{ selectedTank.weight.toFixed(2) }} kg</ion-text></ion-text>
        </div>
        <div id="right">
          <ion-text>Doluluk: <ion-text color="success">{{ (selectedTank.fullness).toFixed(2) }}%</ion-text></ion-text>
          <ion-text>Dolu Hacim: <ion-text color="success">{{filledVolume}} m3</ion-text></ion-text>
          <ion-text>Doldurulabilir Hacim: <ion-text color="success">{{((selectedTank.capacity*98/100) - filledVolume).toFixed(2)}} m3</ion-text></ion-text>
        </div>
      </ion-card-content>
      <ion-card-content v-else>
        <ion-text>Tank bilgisi için tank seçimi yapın</ion-text>
      </ion-card-content>
    </ion-card>
    <ion-card id="filling-card" :disabled="!selectedTank.tankName" color="medium" class="ion-no-margin ion-margin-top">
      <ion-card-header>
        <ion-card-title>
          Doldurma Miktarı
          <ion-text>Kalan boş hacim üzerinden hesaplanır</ion-text>
        </ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-range @ionChange="onRangeChanged" class="ion-no-padding" :pin="true">
          <ion-text slot="start">0%</ion-text>
          <ion-text slot="end">100%</ion-text>
        </ion-range>
        <ion-text>Doldurulan: {{loadValue}}%, {{newFullVolume}} m3</ion-text>
        <ion-text>Tankın doluluğu: {{newFullness.toFixed(2)}}%</ion-text>
        <ion-text color="warning">Tanklar, maksimum tank hacminin 98%'i kadar yüklenebilir</ion-text>
      </ion-card-content>
    </ion-card>
  </ion-content>
  <ion-footer class="ion-padding ion-no-border">
    <ion-button :disabled="loadValue === 0" color="success" expand="block" @click="prepareLoad">Doldur</ion-button>
  </ion-footer>
</ion-page>
</template>


<style scoped>
ion-card {
  box-shadow: none;
}

ion-card-title ion-text{
  font-size: 0.55em;
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

#filling-card ion-card-content {
  display: flex;
  flex-direction: column;
}


ion-select {
  --placeholder-color: black;
  --placeholder-opacity: 80%;
}
</style>
