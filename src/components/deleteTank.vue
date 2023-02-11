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
  import {createConn,db} from "@/helpers/dataBaseConnection"
  import {onMounted, ref} from "vue";
  import {useRouter} from "vue-router";
  import {getTanks} from "@/helpers/getTanksFromDb";


  const $router = useRouter()

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


  const changed = ({detail}:any) => {
    selectedTank.value = detail.value
  }


  const presentToast = async () => {
    const toast = await toastController.create({
      message: 'Tank Silindi',
      duration: 1000,
      position: "top"
    });

    await toast.present();
  }

  const removeFromDatabase = () => {
    const query = "DELETE FROM tank_table WHERE tankName = ?;"
    db.run(query,[`${selectedTank.value.tankName}`])
  }


  const prepareRemove = async () => {
    const alert = await alertController.create({
      header: 'Uyarı',
      backdropDismiss : false,
      message: `Seçilen tank silinecek. Onaylıyor musunuz?`,
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


  onMounted(async () => {
    await createConn()
    await getTanks().then((val) => {
      tanks.value = val
    })
  })


</script>
<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button/>
      </ion-buttons>
      <ion-title>Delete Tank</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-card class="ion-no-margin" color="select_box">
      <ion-card-header>
        <ion-card-title>
          Silinecek Tank
        </ion-card-title>
      </ion-card-header>
      <ion-card-content class="ion-no-padding ion-padding-vertical">
        <ion-select @ionChange="changed" ok-text="Tank Seç" cancel-text="İptal" class="ion-padding" placeholder="Silinecek Tankı Seçiniz">
          <ion-select-option v-for="tank in tanks" :key="tank" :value="tank">{{tank.tankName}}</ion-select-option>
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
  </ion-content>
  <ion-footer class="ion-padding ion-no-border">
    <ion-button :disabled="selectedTank.tankName === null" color="danger" expand="block" @click="prepareRemove">Sil</ion-button>
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
