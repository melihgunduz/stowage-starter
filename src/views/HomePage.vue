<script setup lang="ts">
    import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
    import {onBeforeMount, ref} from "vue";
    import {CapacitorSQLite, SQLiteConnection} from "@capacitor-community/sqlite";
    import {square} from "ionicons/icons";

    const database = ref<any>(null);


    const initDbTable = async () => {
        try {
            const CREATE_TABLE =
                "CREATE TABLE IF NOT EXISTS test_table (" + "id INTEGER PRIMARY KEY NOT NULL,"+"first_name TEXT NOT NULL,"+"last_name TEXT NOT NULL,"+"email TEXT NOT NULL UNIQUE );";
            const resp = await database.value?.run(CREATE_TABLE)
            resp();
            return true;
        } catch (e) {
            alert('error initializing the Database Table')
        }
    }

    const addTestUser = async () => {
      try {
        const resp = await database.value?.run(
            "INSERT INTO test_table (first_name,last_name,email)"+"VALUES(?,?,?);",
            ["Aaron","Saunders","aaron1@gmail.com"]
        )
        console.log('user added')
        return true;
      } catch (e) {
        alert('error creating test user')
      }

    }

        const sqlite = new SQLiteConnection(CapacitorSQLite);
    const dbConnection = async () => {

        try {
          const isDbOpen = await CapacitorSQLite.isDBOpen({"database": "stowage-db"})
          if(isDbOpen){
            alert("veritabanı açık")
          }
        } catch (e){
          alert("veritabanı kapalı, açılıyor")
          const db = await sqlite.createConnection('stowage-db',false,'no-encryption',1,false);
          await db.open();
          database.value = db
          console.log(e)
        }
    }





    const test = 'Test'
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{ test }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Test</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-button @click="dbConnection"> Connect Database </ion-button>
        <ion-button @click="initDbTable"> initialize table </ion-button>
        <ion-button @click="addTestUser"> add user </ion-button>
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
