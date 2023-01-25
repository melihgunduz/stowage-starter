<script setup >
  import {IonPage, IonButton, IonList, modalController} from "@ionic/vue";
  import {ref} from "vue"
  import modalControl from '@/components/modalControl.vue'



  const openModal = async () => {
    const modal = await modalController.create({
      component:modalControl
    });
    await modal.present();
    const {data, role} = await modal.onWillDismiss()

    if (role === 'confirm') {
      console.log(data)
    }
  }


  const buttons = ref([
    {name: 'Tank Ekle'},
    {name: 'Tank Doldur'},
    {name: 'Tank Boşalt'},
    {name: 'Tank Sil'},
    {name: 'Veritabanını Yeniden Başlat'},
  ])

</script>


<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-title>Yönetim</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
        <ion-button @click="openModal">AÇÇÇ</ion-button>
      <ion-list lines="none">
          <ion-button v-for="button in buttons" :key="button" expand="block">
            {{button.name}}
          </ion-button>
      </ion-list>

  </ion-content>
</ion-page>
</template>


<style scoped>
ion-list {
  padding: 0 5px;
}

ion-list ion-button {
  --box-shadow: none;
}
</style>
