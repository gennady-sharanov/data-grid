import * as sinon from 'sinon';
import { mount, createLocalVue } from '@vue/test-utils';
import DataGrid from '@/components/DataGrid.vue';
import Vuex from 'vuex';
import store from '@/store';
import mockProduckData from '@/services/mockProduckData';

global.fetch = require('node-fetch');

const localVue = createLocalVue();
localVue.use(Vuex);

describe('data grid', function() {
  let fakeXml, requests = [], clock, wrapper;

  beforeEach(() => {
    fakeXml = sinon.useFakeXMLHttpRequest();
    fakeXml.onCreate = function (xhr) {
      requests.push(xhr);
    };
    wrapper = mount(DataGrid, {store, localVue});
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    requests = [];
    clock.restore();
  });

  it('render a DataGrid', () => {
    expect(wrapper.is(DataGrid)).toBeTruthy();
  });
  
  it('update data', () => {
    wrapper.vm.result = mockProduckData;
    wrapper.vm.dataSource.store().update(10248, {'Freight': 999.99});
    expect(wrapper.vm.result[0].Freight).toBe(999.99);
    wrapper.vm.dataSource.store().update(10248, {'ShipVia': 2});
    expect(wrapper.vm.result[0].ShipVia).toBe(2);
  });

  it('test load data', async () => {
    const result = await wrapper.vm.dataSource.store().load()
    expect(result[0]).toEqual(wrapper.vm.result[0])
  }, 3000);
});
