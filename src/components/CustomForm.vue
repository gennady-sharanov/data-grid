<template>
  <dx-form
    :form-data="employee"
    css-class="form"
    col-count="2"
    label-location="top"
    label-mode="static"
  >

  </dx-form>
</template>

<script>
import {
  DxForm, DxItem
} from 'devextreme-vue/form';

const employee = {
  name: 'Ivanov Ivan',
  age: 30,
  phone: '8(900)900-90-90',
  city: 'Moscow',
};

export default {
  name: 'custom-form',
  components: {
    DxForm,
  },
  data() {
    return {
      employee,
    };
  }
};
</script>

<style scoped>
.form{
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 10px;
  width: 60%;
  margin: auto;
}
</style>