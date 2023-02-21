<template>
  <div class="container">
    <custom-form class="form" />
    <custom-popup />
  </div>
</template>

<script>
import { CustomForm, CustomPopup } from '@/components';
export default {
  components: {
    CustomForm,
    CustomPopup,
  }
};
</script>

<style scoped>
.form {

}
</style>
