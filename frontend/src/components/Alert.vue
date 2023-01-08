<template>
  <v-alert :type="type">{{ text }}</v-alert>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    text: {
      type: String
    },
    type: {
      type: String
    }
  }
};
</script>
