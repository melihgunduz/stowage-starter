<script setup lang="ts">
  import {IonApp} from '@ionic/vue';
  import TabsPage from "@/views/TabsPage.vue";
  import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from "@capacitor-community/sqlite";
  import {onMounted} from "vue";

  const sqlite = new SQLiteConnection(CapacitorSQLite);
  let db: SQLiteDBConnection;

  //functions
  const createConn = async () => {
    try {
      const ret = await sqlite.checkConnectionsConsistency();
      const isConn = (await sqlite.isConnection("db_tab3", false)).result;

      if (ret.result && isConn) {
        db = await sqlite.retrieveConnection("db_tab3", false);
      } else {
        alert('veritabanı bulunamadı bağlantı oluşturuluyor')
        db = await sqlite.createConnection("db_tab3", false, "no-encryption", 1, false);
      }
      await db.open();

      const query = `
    CREATE TABLE IF NOT EXISTS test_table (
      name TEXT
    );
    `
      const res = await db.execute(query);
      if(res.changes && res.changes.changes && res.changes.changes < 0) {
        new Error(`Error: execute failed`);
      }

    } catch (e) {
      console.log(e)
    }
  }

  // const addData = async () => {
  //   try {
  //     const query = "INSERT INTO test_table (name)\n" +
  //         "VALUES\n" +
  //         "\t('Melih');"
  //     await db.execute(query,false)
  //     // await db.run(
  //     //     "INSERT INTO test_table (id,name)" + "VALUES(?,?);",
  //     //     [8, "melih"]
  //     // )
  //   } catch (e) {
  //     alert('error creating test user')
  //     console.log(e)
  //   }
  //
  // }

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


  //using Functions
  onMounted(() => {
    createConn();
  })

</script>




<template>
<ion-app>
  <TabsPage/>
</ion-app>
</template>
