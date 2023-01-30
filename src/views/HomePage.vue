<script setup lang="ts">
  import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonGrid, IonRow, IonCol, IonText, IonLabel, IonIcon, IonRefresher, IonRefresherContent} from '@ionic/vue';
  import {onMounted, ref} from "vue";
  import {createConn, db} from "@/helpers/dataBaseConnection";
  import {refreshCircleOutline} from "ionicons/icons";


  const refreshActive= ref(true)
  const tanks = ref([{
    tankName : null,
    tankNumber : null,
    parcelNumber : null,
    cargo: null,
    capacity: NaN,
    fullness: NaN,
    weight:NaN
  }])
  const getTanks = async (refresh:boolean) => {

    if (refresh) {
      refreshActive.value = false
    }

    try {
      const query = 'SELECT * FROM tank_table'
      const test = await db.query(query) //use db.query when use SELECT
      const jso = JSON.stringify(test)
      const obj = JSON.parse(jso)
      tanks.value = obj.values
      // for (let i = 0; i < tanks.value.length; i++) {
      //   console.log(tanks.value[i].tankName)
      // }


    } catch (e) {
      alert('error getting table')
      console.log(e)
    }
  }

  const pullToRefresh = async (event:any) => {
    await getTanks(true).then(() => {
      event.target.complete()
      refreshActive.value = true
    })

  }


  onMounted(async () => {
    await createConn()
    await getTanks(false)
  })

</script>

<template>
<ion-page>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-title>Home Page</ion-title>
      <ion-buttons slot="end">
        <ion-button :disabled="!refreshActive" @click="getTanks(true).then(() => refreshActive = true)">
          <ion-icon slot="icon-only" :icon="refreshCircleOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>

  </ion-header>

  <ion-content v-if="tanks.length > 0">
    <ion-refresher slot="fixed" @ionRefresh="pullToRefresh($event)" >
      <ion-refresher-content
          refreshing-spinner="circles"
          refreshing-text="Refreshing...">
      </ion-refresher-content>
    </ion-refresher>
    <ion-grid :fixed="true">
      <ion-row>
        <ion-col v-for="tank in tanks" :key="tank" size="6">
          <ion-card color="primary" class="ion-padding-vertical">
            <ion-card-header class="ion-no-padding ion-padding-horizontal">
              <ion-card-title>
                Tank No: {{ tank.tankNumber }}
              </ion-card-title>
              <ion-card-subtitle>
               Tank Adı: {{ tank.tankName }}
              </ion-card-subtitle>
            </ion-card-header>
            <ion-card-content class="ion-padding-horizontal">
              <ion-label>
                Yük: {{ tank.cargo }}
              </ion-label>
              <ion-label>
                Doluluk: {{ tank.fullness }}
              </ion-label>
              <ion-label>
                Ağırlık: {{ tank.weight }} kg
              </ion-label>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
  <ion-content v-else>
    <div id="container">
      <ion-text>
        Veritabanında Kayıtlı Tank Bulunamadı
      </ion-text>
    </div>
  </ion-content>
</ion-page>
</template>


<style scoped>
ion-card-content {
  display: flex;
  flex-direction: column;
}

#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
}
</style>
