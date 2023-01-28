<script setup lang="ts">
  import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText} from '@ionic/vue';
  // const getUser = async () => {
  //   try {
  //     const query = 'SELECT * FROM test_table'
  //     const test = await db.query(query) //use db.query when use SELECT
  //     const jso = JSON.stringify(test)
  //     const obj = JSON.parse(jso)
  //
  //     // headTest.value = obj.values[1].name
  //
  //     for (let i = 0; i < obj.values.length; i++) {
  //       console.log(obj.values[i].name)
  //     }
  //
  //   } catch (e) {
  //     alert('error getting test user')
  //     console.log(e)
  //   }
  //
  // }



</script>

<template>
<ion-page>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-title>Home Page</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <div id="container">
      <ion-text>
        Home Page
      </ion-text>
    </div>
  </ion-content>
</ion-page>
</template>


<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
