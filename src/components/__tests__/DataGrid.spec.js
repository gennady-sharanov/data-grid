import { mount, createLocalVue } from '@vue/test-utils';
import DataGrid from '@/components/DataGrid.vue';
import Vuex from 'vuex';
import store from '@/store';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('data grid', () => {
  it('render a DataGrid', () => {
    const wrapper = mount(DataGrid, {store, localVue});
    expect(wrapper.is(DataGrid)).toBeTruthy();
  });
});
