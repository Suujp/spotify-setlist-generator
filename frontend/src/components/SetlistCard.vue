<template>
  <v-card tile>
    <v-card-title>{{ artistName }} Live at {{ venueName }}</v-card-title>
    <v-card-text>アーティスト名 : {{ artistName }}</v-card-text>
    <v-card-text>会場 : {{ venueCountryName }}, {{ venueCityName }}</v-card-text>
    <v-card-text>日時 : {{ replaceEventDate }}</v-card-text>
    <v-card-actions>
      <SetlistDialog :setlist="setlist" :artistName="artistName" :venueName="venueName"></SetlistDialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import SetlistDialog from '../components/SetlistDialog.vue';

export default {
  name: 'SetlistCard',
  components: {
    SetlistDialog: SetlistDialog
  },
  props: {
    artistName: {
      type: String
    },
    venueName: {
      type: String
    },
    venueCountryName: {
      type: String
    },
    venueCityName: {
      type: String
    },
    eventDate: {
      type: String
    },
    setlist: {
      type: Array
    }
  },
  computed: {
    replaceEventDate: {
      get: function() {
        return this.eventDate.split('-').reverse().join('/');
      }
    }
  }
};
</script>
