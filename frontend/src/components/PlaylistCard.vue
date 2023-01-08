<template>
  <v-card tile ripple hover :href="item.external_urls.spotify">
    <v-img :src="item.images[0].url" v-if="isActive"></v-img>
    <v-img src="../assets/no-image.jpg" v-if="!isActive"></v-img>
    <div class="text-truncate text-center pa-5">{{ item.name }}</div>
  </v-card>
</template>

<script>
export default {
  name: 'PlaylistCard',
  props: {
    item: {
      type: Object
    }
  },
  data: function() {
    return {
      isActive: true
    }
  },
  created: function() {
    if (this.item.images.length === 0) {
      this.isActive = false;
    }
  }
};
</script>
