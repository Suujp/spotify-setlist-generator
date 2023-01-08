<template>
  <v-container>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-row>
      <v-col cols="12" v-if="errorMessage">
        <Alert :text="errorMessage" type="error"></Alert>
      </v-col>
      <v-col xl="2" lg="2" md="3" sm="3" cols="6" v-for="item in data.items" :key="item.id">
        <PlaylistCard :item="item"></PlaylistCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PlaylistCard from '../components/PlaylistCard.vue';
import Alert from '../components/Alert.vue';
import axios from 'axios';

export default {
  name: 'Playlist',
  components: {
    PlaylistCard: PlaylistCard,
    Alert: Alert
  },
  data: function() {
    return {
      data: '',
      accessToken: '',
      isLoading: false,
      errorMessage: ''
    }
  },
  created: function() {
    this.isLoading = true;
    this.accessToken = `Bearer ${localStorage.getItem('accessToken')}`;
    const url = 'http://localhost:3000/api/me/playlists';
    const config = {
      headers: {
        'Authorization': this.accessToken
      }
    };

    axios.get(url, config)
    .then((response) => {
      console.log(response);
      this.data = response.data;
      this.isLoading = false;
    })
    .catch((error) => {
      console.log(error);
      this.isLoading = false;
      this.errorMessage = 'プレイリスト情報を取得できませんでした。アクセストークンを更新してください。';
    });

  }
};
</script>
