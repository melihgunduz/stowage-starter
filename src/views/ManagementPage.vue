<script setup lang="ts">
  import {IonPage} from "@ionic/vue";
</script>


<template>
<ion-page>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-title>Tank ekleme ekranı</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content :fullscreen="true">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title size="large">Test</ion-title>
      </ion-toolbar>
    </ion-header>

    <div id="container">
      <ion-text>Hello World!</ion-text>
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
</style>
