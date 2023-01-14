<template>
  <v-container style="max-width: 1400px;">
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-row>
      <v-col cols="12" v-if="errorMessage">
        <Alert :text="errorMessage" type="error"></Alert>
      </v-col>
      <v-col xl="6" lg="6" md="12" sm="12" cols="12" v-for="setlist in data.setlist" :key="setlist.id">
        <SetlistCard
          :artistName="setlist.artist.name"
          :venueName="setlist.venue.name"
          :venueCountryName="setlist.venue.city.country.name"
          :venueCityName="setlist.venue.city.name"
          :eventDate="setlist.eventDate"
          :setlist="setlist.sets.set"
        >
        </SetlistCard>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" v-if="isActive">
        <v-pagination circle v-model="page" :length="length" :total-visible="10" @input="getSetlist()"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SetlistCard from '../components/SetlistCard.vue';
import Alert from '../components/Alert.vue';
import axios from 'axios';

export default {
  name: 'SearchSetlist',
  components: {
    SetlistCard: SetlistCard,
    Alert: Alert
  },
  data: function() {
    return {
      data: '',
      mbid: this.$route.params.mbid,
      page: 1,
      length: 1,
      isActive: false,
      isLoading: false,
      errorMessage: ''
    }
  },
  created: function() {
    this.getSetlist();
  },
  methods: {
    getSetlist: function() {
      this.isLoading = true;
      const params = new URLSearchParams({
        p: this.page
      });
      const url = `http://localhost:3000/api/artist/${this.mbid}/setlists?${params.toString()}`;

      axios.get(url)
      .then((response) => {
        console.log(response);
        this.data = response.data;
        this.length = Math.ceil(this.data.total / this.data.itemsPerPage);
        this.isActive = true;
        this.isLoading = false;
        this.errorMessage = '';
        this.$vuetify.goTo(0);
      })
      .catch((error) => {
        console.log(error);
        this.data = '';
        this.isActive = false;
        this.isLoading = false;
        this.errorMessage = 'セットリストが見つかりませんでした。別のキーワードを試してください。';
      });
    }
  }
};
</script>
