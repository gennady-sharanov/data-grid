<template>
  <div class="container">
    <DxDataGrid id="dataGrid"
      :data-source="customDataSource"
    >
      <DxEditing
        :allow-updating="true"
        :allow-editing="true"
        mode="cell"
      />
      <DxColumn
        data-field="Product_ID"
        caption="ID"
      >
        <DxLookup
          :data-source="ids"
          value-expr="id"
          display-expr="value"
        />
      </DxColumn>
      <DxColumn
        data-field="Product_Name"
        caption="Product"
      >
        <DxPatternRule
          :pattern="pattern"
          message="Only latin characters without spaces"
        />
      </DxColumn>
      <DxColumn
        data-field="Product_Cost"
        caption="Cost"
      />
    </DxDataGrid>
  </div>
</template>

<script>
import { DxColumn, DxDataGrid, DxEditing, DxLookup, DxPatternRule } from 'devextreme-vue/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import { getProducts } from '@/services/product.service';

const result = [];
let isLoadSuccess = false;
const customDataSource = new CustomStore({
  key: 'Product_ID',
  loadMode: 'DataGrid',
  load: () => {
    if (isLoadSuccess) return Promise.resolve(result);
    isLoadSuccess = true;
    return getProducts(result);
  },
  update: (index, item) => {
    for(let key in item) {
      result[index - 1][key] = item[key];
    }
  }
});

export default {
  components: {
    DxDataGrid,
    DxEditing,
    DxColumn,
    DxLookup,
    DxPatternRule
  },
  data () {
    return {
      customDataSource,
      ids: this.$store.state.dataGrid.ids,
      pattern: /^([a-zA-Z]+)$/,
    };
  },
};
</script>

<style scoped>
.container {
  margin: 20px;
  padding: 5px 5px 10px;
  border: 2px solid #eee;
}

#dataGrid {
  height: 500px;
}
</style>