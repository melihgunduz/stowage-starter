<script setup >
  import {IonPage, IonButton, IonList, modalController} from "@ionic/vue";
  import {ref} from "vue"
  import { useRoute, useRouter } from 'vue-router';



  const $router = useRouter()
  const buttons = ref([
    {name: 'Tank Ekle', type:'add'},
    {name: 'Tank Doldur', type:'fill'},
    {name: 'Tank Boşalt', type:'unload'},
    {name: 'Tank Sil', type:'delete'},
    {name: 'Veritabanını Yeniden Başlat', type:'reconnect'},
  ])

  const openActionControl = (val) => {
    $router.push({
      name: 'Control',
      params: {
        action: val,
      },
    });
  }

</script>


<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-title>Yönetim</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content >
      <ion-list lines="full">
          <ion-item :detail="true" button v-for="button in buttons" :key="button" @click="openActionControl(button.type)">
            {{button.name}}
          </ion-item>
      </ion-list>
  </ion-content>
</ion-page>
</template>


<style scoped>
ion-list ion-item {
  --box-shadow: none;
}
</style>
