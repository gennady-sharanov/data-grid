<template>
  <dx-context-menu
    target="#dataGrid .dx-row"
    :data-source="menuItems"
    :close-on-outside-click="closeOnOutsideClick"
  >
    <template #item="{ data }">
      <div v-if="data.type === 'title'" class="info">
        {{ data.text }} {{ selected.length }}
      </div>
      <div v-else-if="data.type === 'checkbox'" class="checkbox">
        <dx-check-box :value="data.isSelect" :text="data.text"/>
        {{ newValue[data.index] }}
      </div>
      <div v-else class="actionMenu">
        <dx-button
          @click="handleAgree"
          type="default"
          text="Ok"
        />
        <dx-button
          @click="handleDisagree"
          type="normal"
          text="Cancel"
        />
      </div>
    </template>
  </dx-context-menu>
</template>

<script>
import { DxContextMenu, DxCheckBox, DxButton, } from 'devextreme-vue';

export default {
  components: {
    DxContextMenu,
    DxCheckBox,
    DxButton,
  },
  props: {
    selected: {
      type: Array,
      required: true,
    },
    updateData: null,
    newValue: {
      type: Array,
      required: true,
    }
  },
  data(){
    return {
      isVisible: true,
      menuItems: [
        {
          text: 'Selected rows:',
          disabled: true,
          type: 'title',
        },
        {
          text: 'set ship via = ',
          type: 'checkbox',
          isSelect: false,
          index: 0,
          onClick: (e) => this.toggleCheckbox(e, 1),
        },
        {
          text: 'set freight = ',
          type: 'checkbox',
          isSelect: false,
          index: 1,
          onClick: (e) => this.toggleCheckbox(e, 2),
        },
        {
          onClick: (e) => {
            if (this.isVisible)
              return e.event.stopPropagation();

            this.menuItems[1].isSelect = false;
            this.menuItems[2].isSelect = false;
            this.isVisible = true;
          }
        },
      ],
    };
  },
  methods: {
    closeOnOutsideClick: () => false,
    handleDisagree() {
      this.isVisible = false;
    },
    handleAgree() {
      this.isVisible = false;
      if (this.menuItems[1].isSelect || this.menuItems[2].isSelect) {
        this.selected.forEach(element => {
          if (this.menuItems[1].isSelect)
            element.ShipVia = this.newValue[0];
          if (this.menuItems[2].isSelect)
            element.Freight = this.newValue[1];
        });
        this.updateData(this.selected);
      }
    },
    toggleCheckbox(e, index) {
      e.event.stopPropagation();
      this.menuItems[index].isSelect = !this.menuItems[index].isSelect;
    },
  }
};
</script>

<style scoped>
.info {
  font-size: 16px;
  margin: 5px 0;
}

.checkbox {
  border-top: 2px solid #eee;
  padding: 10px 5px;
}

.actionMenu {
  display: flex;
  gap: 10px;
  padding: 10px 5px;
  border-top: 2px solid #eee;
}
</style>

<style >
li .dx-menu-item.dx-state-disabled:has(.info) {
  opacity: 1;
}
</style>