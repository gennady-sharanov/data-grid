<template>
  <div class="container">
    <products-context-menu
      :selected="selected"
      :updateData="updateData"
      :newValue="newValue"
    />
    <dx-data-grid
      id="dataGrid"
      @contextMenuPreparing="handleContextMenuPreparing"
      @selection-changed="handleSeletionChange"
      :data-source="dataSource"
    >
      <dx-selection
        mode="multiple"
      />
      <dx-editing
        :allow-updating="true"
        :allow-editing="true"
        mode="cell"
      />
      <dx-column
        data-field="EmployeeID"
        caption="ID"
      >
        <dx-lookup
          :data-source="ids"
          value-expr="id"
          display-expr="value"
        />
      </dx-column>
      <dx-column
        data-field="ShipCountry"
        caption="ShipCountry"
      >
        <dx-pattern-rule
          :pattern="pattern"
          message="Only latin characters without spaces"
        />
      </dx-column>
      <dx-column
        data-field="ShipVia"
        caption="Ship Via"
      />
      <dx-column
        data-field="Freight"
        caption="Freight"
      />
    </dx-data-grid>
  </div>
</template>

<script>
import {
  DxColumn,
  DxDataGrid,
  DxEditing,
  DxLookup,
  DxPatternRule,
  DxSelection
} from 'devextreme-vue/data-grid';
import ProductsContextMenu from '@/components/ProductsContextMenu.vue';
import CustomStore from 'devextreme/data/custom_store';
import { getProducts, updateProducts } from '@/services/product.service';
import DataSource from 'devextreme/data/data_source';

export default {
  components: {
    DxDataGrid,
    DxEditing,
    DxColumn,
    DxLookup,
    DxPatternRule,
    DxSelection,
    ProductsContextMenu,
  },
  data () {
    return {
      dataSource: new DataSource({
        store: new CustomStore({
          key: 'OrderID',
          load: getProducts,
          update: updateProducts,
        }),
      }),
      ids: this.$store.state.dataGrid.ids,
      pattern: /^([a-zA-Z]+)$/,
      selected: [],
      newValue: [],
    };
  },
  methods: {
    handleContextMenuPreparing(e) {
      if (e.target === 'content') {
        this.newValue = [
          e.row.data.ShipVia,
          e.row.data.Freight
        ];
      }
    },
    handleSeletionChange(e) {
      this.selected = e.component.getSelectedRowsData();
    },
    updateData(elements) {
      // TODO:  не понятно как реализовать отправку данных через массив, поэтому так
      elements.forEach(el => {
        this.dataSource.store().update(
          el.OrderID,
          {
            ShipVia: el.ShipVia,
            Freight: el.Freight,
          }
        );
      });
    },
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