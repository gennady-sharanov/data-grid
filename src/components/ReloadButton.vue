<template>
  <dx-button type="default" text="Reloading data" @click="handleReload"/>
</template>

<script>
import { DxButton } from 'devextreme-vue';
export default {
  name: 'reload-button',
  components: { DxButton },
  props: {
    handleReload: {
      type: Function,
      requared: true,
    },
  },
};
</script>