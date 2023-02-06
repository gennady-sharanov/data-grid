<template>
  <div class="home">
    Home page
    <DataGrid />
  </div>
</template>

<script>
import DataGrid from '@/components/DataGrid.vue';

export default {
  name: 'HomePage',
  components: {
    DataGrid
  },
};
</script>
