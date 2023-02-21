<template>
  <div class="container">
    <products-context-menu
      :selected="selected"
      :new-value="newValue"
      :update-data="updateData"
    />
    <data-grid
      :selected="selected"
      :set-selected="setSelected"
      :set-new-value="setNewValue"
      ref="dataGrid"
    />
    <reload-button class="reload-button" :handleReload="reloadTableData"/>
  </div>
</template>

<script>
import { DataGrid, ReloadButton, ProductsContextMenu } from '@/components';

export default {
  name: 'TableTemplate',
  components: {
    ProductsContextMenu,
    DataGrid,
    ReloadButton,
  },
  data () {
    return {
      newValue: [],
      selected: [],
    };
  },
  methods: {
    reloadTableData() {
      this.$refs.dataGrid.relodData();
    },
    updateData(elements) {
      this.$refs.dataGrid.updateData(elements);
    },
    setSelected(selected) {
      this.selected = selected;
    },
    setNewValue(newValue) {
      this.newValue = newValue;
    },
  },
};
</script>

<style scoped>
.container {
  padding: 5px 5px 10px;
  border: 2px solid #eee;

}
.reload-button {
  position: relative;
  left: 100%;
  transform: translateX(-100%);
}
</style>