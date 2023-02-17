<template>
  <dx-data-grid
    id="dataGrid"
    @context-menu-preparing="handleContextMenuPreparing"
    @selection-changed="handleSeletionChange"
    :data-source="dataSource"
    ref="dataGrid"
  >
    <dx-selection
      mode="multiple"
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
    <dx-editing
      :allow-updating="true"
      :allow-editing="true"
      :allow-deleting="true"
      mode="row"
      :use-icons="true"
    />
    <dx-column
      type="buttons"
      :width="80"
      ref="editColumn"
      css-class="editing-visible"
    >
      <dx-button
        name="edit"
      />
      <dx-button
        name="delete"
      />
      <dx-button
        :visible="false"
        name="save"
      />
      <dx-button
        :visible="false"
        name="cancel"
      />
    </dx-column>
  </dx-data-grid>
</template>

<script>
import {
  DxColumn,
  DxDataGrid,
  DxEditing,
  DxLookup,
  DxPatternRule,
  DxSelection,
  DxButton
} from 'devextreme-vue/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import { getProducts } from '@/services/product.service';
import DataSource from 'devextreme/data/data_source';

export default {
  components: {
    DxDataGrid,
    DxEditing,
    DxColumn,
    DxLookup,
    DxPatternRule,
    DxSelection,
    DxButton,
  },
  props: {
    selected: {
      type: Array,
      requared: true,
    },
    setSelected: {
      type: Function,
      requared: true,
    },
    setNewValue: {
      type: Function,
      requared: true,
    },
  },
  data () {
    return {
      result: null,
      dataSource: new DataSource({
        store: new CustomStore({
          key: 'OrderID',
          load: () => {
            if (!this.isReloadData && this.result) return Promise.resolve(this.result);
            this.isReloadData = false;
            return getProducts().then(data => this.result = data);
          },
          update: (orderId, newValue) => {
            const currentElemnt = this.result.find(el => el.OrderID === orderId);
            for (const key in newValue) {
              currentElemnt[key] = newValue[key];
            }
            return new Promise((r) => setTimeout(() => r(), 1000));
          },
          remove: (orderId) => {
            this.result = this.result.filter(el => el.OrderID !== orderId);
          }
        }),
      }),
      ids: this.$store.getters.ids,
      pattern: /^([a-zA-Z]+)$/,
      isReloadData: false,
    };
  },
  methods: {
    handleContextMenuPreparing(e) {
      if (!this.selected.length) e.event.stopPropagation();
      if (e.target === 'content') {
        this.setNewValue([
          e.row.data.ShipVia,
          e.row.data.Freight
        ]);
      }
    },
    handleSeletionChange(e) {
      this.setSelected(e.component.getSelectedRowsData());
    },
    updateData(elements) {
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
    relodData() {
      this.isReloadData = true;
      this.dataSource.reload();
    }
  },
};
</script>

<style scoped>
#dataGrid {
  height: 500px;
}
</style>

<style>
.editing-visible {
  opacity: 0;
  height: 33px;
}

tr:hover .editing-visible {
  opacity: 1;
}

.editing-visible.dx-command-edit-with-icons .dx-link {
  text-decoration: none;
}
</style>