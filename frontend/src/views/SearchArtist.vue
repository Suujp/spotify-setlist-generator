<template>
  <v-container style="max-width: 1400px;">
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="アーティスト名を入力してください"
          filled
          rounded
          clearable
          prepend-inner-icon="mdi-magnify"
          v-model="artistName"
          @keydown.enter="getArtist($event)"
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" v-if="errorMessage">
        <Alert :text="errorMessage" type="error"></Alert>
      </v-col>
      <v-col xl="6" lg="6" md="12" sm="12" cols="12" v-for="artist in data.artist" :key="artist.mbid">
        <ArtistCard :artistName="artist.name" :artistDisambiguation="artist.disambiguation" :artistMbid="artist.mbid"></ArtistCard>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" v-if="isActive">
        <v-pagination circle v-model="page" :length="length" :total-visible="10" @input="getArtist($event)"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ArtistCard from '../components/ArtistCard.vue';
import Alert from '../components/Alert.vue';
import axios from 'axios';

export default {
  name: 'SearchArtist',
  components: {
    ArtistCard: ArtistCard,
    Alert: Alert
  },
  data: function() {
    return {
      data: '',
      artistName: '',
      page: 1,
      length: 1,
      isActive: false,
      isLoading: false,
      errorMessage: ''
    }
  },
  methods: {
    getArtist: function(event) {
      this.isLoading = true;
      if (event.key === 'Enter') {
        this.page = 1;
      }

      const params = new URLSearchParams({
        artistName: this.artistName,
        p: this.page
      });
      const url = `http://localhost:3000/api/search/artists?${params.toString()}`;

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
        this.errorMessage = 'アーティストが見つかりませんでした。別のキーワードを試してください。';
      });
    }
  }
};
</script>
