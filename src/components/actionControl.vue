<script setup lang="ts">
  import {IonPage} from "@ionic/vue";
  import {useRoute} from "vue-router";
  import AddTank from "@/components/addTank.vue";


  const $route = useRoute();
  const actionType = ($route.params.action)

</script>

// TODO: 'Tank ekleme tamamlanacak diğer bölümlere geçilecek'
<template>
  <add-tank v-if="actionType==='add'"/>

</template>


<style scoped>

</style>
