<template>
  <v-card tile>
    <v-card-title>{{ artistName }}</v-card-title>
    <v-card-text>{{ artistDisambiguation }}</v-card-text>
    <v-card-actions>
      <v-btn text :to="`/search/${artistMbid}`">コンサート・ライブ一覧</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ArtistCard',
  props: {
    artistName: {
      type: String
    },
    artistDisambiguation: {
      type: String
    },
    artistMbid: {
      type: String
    }
  }
};
</script>
