<script setup lang="ts">
  import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton} from '@ionic/vue';
  import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from "@capacitor-community/sqlite";
  import { ref} from "vue";

  const sqlite = new SQLiteConnection(CapacitorSQLite);
  let db: SQLiteDBConnection;
  const headTest = ref('Stowage')


  // console.log( await CapacitorSQLite.getDatabaseList().then((value) => {
  //   return value.values
  // }))
  const addTestUser = async () => {
    try {
      const query = "INSERT INTO test_table (name)\n" +
          "VALUES\n" +
          "\t('Melih');"
      await db.execute(query,false)
      // await db.run(
      //     "INSERT INTO test_table (id,name)" + "VALUES(?,?);",
      //     [8, "melih"]
      // )
    } catch (e) {
      alert('error creating test user')
      console.log(e)
    }

  }
  const getUser = async () => {
    try {
      const query = 'SELECT * FROM test_table'
      const test = await db.query(query) //use db.query when use SELECT
      const jso = JSON.stringify(test)
      const obj = JSON.parse(jso)

      // headTest.value = obj.values[1].name

      for (let i = 0; i < obj.values.length; i++) {
        console.log(obj.values[i].name)
      }

    } catch (e) {
      alert('error getting test user')
      console.log(e)
    }

  }

  const closeConnections = () => {
    sqlite.closeAllConnections()
  }

  const dbConnection = async () => {
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

  const deleteDb = () => {
    try {
    CapacitorSQLite.deleteDatabase({"database" : "db_tab3"})
    } catch (e) {
      console.log(e)
    }
  }
</script>

<template>
<ion-page>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-title>{{ headTest }}</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content :fullscreen="true">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title size="large">Test</ion-title>
      </ion-toolbar>
    </ion-header>

    <div id="container">
      <ion-button @click="dbConnection"> Connect Database</ion-button>
      <ion-button @click="addTestUser"> add user</ion-button>
      <ion-button @click="getUser"> get user</ion-button>
      <ion-button @click="closeConnections"> Close Connections</ion-button>
      <ion-button @click="deleteDb">Delete Db</ion-button>
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
  transform: translateY(-50%);
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
