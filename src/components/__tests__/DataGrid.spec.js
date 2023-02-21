import * as sinon from 'sinon';
import { mount, createLocalVue } from '@vue/test-utils';
import DataGrid from '@/components/DataGrid.vue';
import ReloadButton from '@/components/ReloadButton.vue';
import Vuex from 'vuex';
import store from '@/store';
import mockProduckData from '@/services/mockProduckData';

global.fetch = require('node-fetch');

const localVue = createLocalVue();
localVue.use(Vuex);

/* describe('data grid', function() {
  let fakeXml, requests = [], clock, wrapper, result;

  beforeEach(() => {
    fakeXml = sinon.useFakeXMLHttpRequest();
    fakeXml.onCreate = function (xhr) {
      requests.push(xhr);
    };
    wrapper = mount(DataGrid, {store, localVue});
    this.requests = [];
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

  it('load/reload data', async () => {
    result = await wrapper.vm.dataSource.store().load()
    expect(result[0]).toEqual(wrapper.vm.result[0])

    wrapper.vm.result = null;
    const reloadButton = wrapper.findComponent({ name: 'reload-button'})
    expect(reloadButton.is(ReloadButton)).toBeTruthy()
    reloadButton.vm.handleRealoadData();
    await clock.tickAsync(2500);
    expect(result[0]).toEqual(wrapper.vm.result[0])
  }, 5000);
}); */


describe('test expect', () => {
  it('objectContaining', () => {
    let a = {
      a: 10,
      b: 6,
      c: {
        d: 7,
        e: 'aa'
      }
    };
    let b = {
      a: 10,
      b: 6,
    };
    expect(a).toEqual(expect.objectContaining(b));
  });

  it('arrayContaining', () => {
    let a = [1, 2, {
      a: 10,
      b: 20
    }, 4];
    let b = [1, 2, {
      a: 10,
      b: 20
    }, 4];
    expect(a).toEqual(expect.arrayContaining(b));
  });
});