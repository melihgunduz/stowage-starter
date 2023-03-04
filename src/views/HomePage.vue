<script setup lang="ts">
  import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonGrid, IonRow, IonCol, IonText, IonIcon, IonRefresher, IonRefresherContent, IonButtons, IonButton} from '@ionic/vue';
  import {onMounted, ref} from "vue";
  import {createConn, db} from "@/helpers/dataBaseFunctions";
  import {refreshCircleOutline} from "ionicons/icons";


  const refreshActive= ref(true)
  const groupSTanks = ref([{
    tankName : null,
    tankNumber : null,
    parcelNumber : null,
    cargo: null,
    capacity: NaN,
    fullness: NaN,
    weight:NaN,
    goodDensity: NaN,
  }])
  const groupPTanks = ref([{
    tankName : null,
    tankNumber : null,
    parcelNumber : null,
    cargo: null,
    capacity: NaN,
    fullness: NaN,
    weight:NaN,
    goodDensity: NaN,
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
      groupSTanks.value = obj.values.filter((i:any) => i.tankGroup === 'S')
      groupPTanks.value = obj.values.filter((i:any) => i.tankGroup === 'P')

    } catch (e) {
      alert('error getting table')
      console.log(e)
    }
  }

  const refreshData = async (event:any) => {
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
  <ion-header :translucent="true" >
    <ion-toolbar>
      <ion-title>Home Page</ion-title>
      <ion-buttons slot="end">
        <ion-button :disabled="!refreshActive" @click="getTanks(true).then(() => refreshActive = true)">
          <ion-icon slot="icon-only" :icon="refreshCircleOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content :fullscreen="true" v-if="groupPTanks.length ||groupSTanks.length > 0">
    <ion-refresher slot="fixed" @ionRefresh="refreshData($event)" >
      <ion-refresher-content
          refreshing-spinner="circles"
          refreshing-text="Refreshing...">
      </ion-refresher-content>
    </ion-refresher>
    <ion-grid :fixed="true">
      <ion-row>
        <ion-col size="6">

          <ion-row v-for="tank in groupSTanks" :key="tank">
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
                <ion-text>
                  Yük: <ion-text class="data-text">{{ tank.cargo }}</ion-text>
                </ion-text>
                <ion-text>
                  Doluluk: <ion-text class="data-text">{{ tank.fullness }}%</ion-text>
                </ion-text>
                <ion-text>
                  Hacim: <ion-text class="data-text">{{ tank.capacity }} m3</ion-text>
                </ion-text>
                <ion-text>
                  Dolu Hacim: <ion-text class="data-text">{{ (tank.weight / tank.goodDensity).toFixed(2) }} m3</ion-text>
                </ion-text>
                <ion-text>
                  Ağırlık: <ion-text class="data-text">{{ (tank.weight).toFixed(2) }} kg</ion-text>
                </ion-text>
              </ion-card-content>
            </ion-card>
          </ion-row>
        </ion-col>
        <ion-col size="6">
          <ion-row  v-for="tank in groupPTanks" :key="tank">
            <ion-card color="secondary" class="ion-padding-vertical">
              <ion-card-header class="ion-no-padding ion-padding-horizontal">
                <ion-card-title>
                  Tank No: {{ tank.tankNumber }}
                </ion-card-title>
                <ion-card-subtitle>
                  Tank Adı: {{ tank.tankName }}
                </ion-card-subtitle>
              </ion-card-header>
              <ion-card-content class="ion-padding-horizontal">
                <ion-text>
                  Yük: <ion-text class="data-text">{{ tank.cargo }}</ion-text>
                </ion-text>
                <ion-text>
                  Doluluk: <ion-text class="data-text">{{ tank.fullness }}%</ion-text>
                </ion-text>
                <ion-text>
                  Hacim: <ion-text class="data-text">{{ tank.capacity }} m3</ion-text>
                </ion-text>
                <ion-text>
                  Dolu Hacim: <ion-text class="data-text">{{ (tank.weight / tank.goodDensity).toFixed(2) }} m3</ion-text>
                </ion-text>
                <ion-text>
                  Ağırlık: <ion-text class="data-text">{{ (tank.weight).toFixed(2) }} kg</ion-text>
                </ion-text>
              </ion-card-content>
            </ion-card>
          </ion-row>

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
  padding-bottom: 0;
}


ion-card-content .data-text {
  color: #fab510;
}
</style>
