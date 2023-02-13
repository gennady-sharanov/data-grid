import { mount, createLocalVue } from '@vue/test-utils';
import DataGrid from '@/components/DataGrid.vue';
import Vuex from 'vuex';
import store from '@/store';
import mockProduckData from '@/services/mockProduckData';

const localVue = createLocalVue();
localVue.use(Vuex);


describe('data grid', () => {
  it('render a DataGrid', () => {
    const wrapper = mount(DataGrid, {store, localVue});
    expect(wrapper.is(DataGrid)).toBeTruthy();
  });
  
  it('update data', () => {
    const wrapper = mount(DataGrid, {store, localVue});
    wrapper.vm.result = mockProduckData;
    wrapper.vm.dataSource.store().update(10248, {'Freight': 999.99});
    expect(wrapper.vm.result[0].Freight).toBe(999.99);
    wrapper.vm.dataSource.store().update(10248, {'ShipVia': 2});
    expect(wrapper.vm.result[0].ShipVia).toBe(2);
  });
});
