<template>
  <div>
    <dx-button type="default" text="Reloading data" @click="handleRealoadData"/>
  </div>
</template>

<script>
import { DxButton } from 'devextreme-vue';
export default {
  name: 'reload-button',
  components: { DxButton },
  props: {
    refs: null,
    setReloadData: {
      type: Function,
      requared: true,
    },
  },
  methods: {
    handleRealoadData() {
      this.setReloadData();
      this.refs.dataGrid.dataSource.reload();
    }
  }
};
</script>