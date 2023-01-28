<script setup lang="ts">
  import {useRoute} from "vue-router";
  import AddTank from "@/components/addTank.vue";
  import FillTank from "@/components/fillTank.vue";


  const $route = useRoute();
  const actionType = ($route.params.action)

</script>

// TODO: 'Tank ekleme tamamlanacak diğer bölümlere geçilecek'
<template>
  <add-tank v-if="actionType==='add'"/>
  <fill-tank v-else-if="actionType==='fill'"/>
</template>


<style scoped>

</style>
