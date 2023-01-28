<script setup lang="ts">
  import {IonApp} from '@ionic/vue';
  import TabsPage from "@/views/TabsPage.vue";

  // const getData = async () => {
  //   try {
  //     const query = 'SELECT * FROM test_table'
  //     const test = await db.query(query) //use db.query when use SELECT
  //     const jso = JSON.stringify(test)
  //     const obj = JSON.parse(jso)
  //
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
<ion-app>
  <TabsPage/>
</ion-app>
</template>
