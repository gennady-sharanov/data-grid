<template>
  <div>
    <dx-button
      @click="togglePopup"
      type="default"
      height="38px"
      class="button"
    >open popup</dx-button>
    <DxPopup
      width="80%"
      height="70%"
      :visible="isVisiblePopup"
      :show-title="false"
      :close-on-outside-click="true"
      @hidden="onHidden"
    >
      <dx-scroll-view>
        <custom-list />
      </dx-scroll-view>
      <dx-toolbar-item
        widget="dxButton"
        toolbar="bottom"
        location="after"
        :options="closeButtonOptions"
      />
    </DxPopup>
  </div>
</template>
<script>
import { DxButton } from 'devextreme-vue';
import { DxPopup, DxToolbarItem } from 'devextreme-vue/popup';
import { CustomList } from '@/components';
import { DxScrollView } from 'devextreme-vue/scroll-view';

export default {
  components: {
    DxPopup,
    DxButton,
    DxToolbarItem,
    CustomList,
    DxScrollView,
  },
  data() {
    return {
      isVisiblePopup: false,
      closeButtonOptions: {
        text: 'Close',
        onClick: () => {
          this.isVisiblePopup = false;
        }
      },
    };
  },
  methods: {
    togglePopup() {
      this.isVisiblePopup = !this.isVisiblePopup;
    },
    onHidden() {
      this.isVisiblePopup = false;
    }
  },
};
</script>
<style scoped>
#textBlock {
  padding-left: 20px;
  padding-right: 20px;
  line-height: 1.6em;
}

.button {
  margin-left: auto;
  position: relative;
  left: 100%;
  transform: translateX(-100%);
  margin-top: 20px;
}
</style>
