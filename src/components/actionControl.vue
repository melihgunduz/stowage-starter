<script setup lang="ts">
  import {useRoute} from "vue-router";
  import AddTank from "@/components/addTank.vue";
  import FillTank from "@/components/fillTank.vue";
  import UnloadTank from "@/components/unloadTank.vue";
  import DeleteTank from "@/components/deleteTank.vue";
  import AddGood from "@/components/addGood.vue";


  const $route = useRoute();
  const actionType = ($route.params.action)


</script>

<template>
  <add-tank v-if="actionType==='add'"/>
  <fill-tank v-else-if="actionType==='fill'"/>
  <unload-tank v-else-if="actionType === 'unload'" />
  <delete-tank v-else-if="actionType === 'remove'" />
  <add-good v-else-if="actionType === 'createGood'" />
</template>


<style scoped>

</style>
