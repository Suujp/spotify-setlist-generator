<template>
  <v-dialog scrollable max-width="1000px" v-model="dialog">
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">セットリストを見る</v-btn>
    </template>

    <v-card>
      <v-card-title>セットリストの詳細</v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" v-if="successMessage">
              <Alert :text="successMessage" type="success"></Alert>
            </v-col>
            <v-col cols="12" v-if="errorMessage">
              <Alert :text="errorMessage" type="error"></Alert>
            </v-col>
            <v-col cols="12">
              <v-text-field label="プレイリストの名前" filled rounded clearable v-model="playlistName"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea label="プレイリストの説明" filled rounded clearable rows="3" v-model="playlistDescription"></v-textarea>
            </v-col>
            <v-col cols="4">
              <v-switch label="プレイリストを公開" v-model="isPublic"></v-switch>
            </v-col>
            <v-col cols="8">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="addSongIndex()">全曲を選択</v-btn>
                <v-btn text @click="removeSongIndex()">選択を解除</v-btn>
              </v-card-actions>
            </v-col>
            <v-col cols="12">
              <v-list>
                <v-list-item-group multiple v-model="selectedSongIndexs">
                  <v-list-item v-for="(songName, index) in songNames" :key="index">
                    <v-list-item-content>
                      <v-list-item-title>{{ index + 1 }}. {{ songName }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="createPlaylist()">プレイリストを作成</v-btn>
        <v-btn text @click="dialog=false">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Alert from '../components/Alert.vue';
import axios from 'axios';

export default {
  name: 'SetlistDialog',
  components: {
    Alert: Alert
  },
  props: {
    setlist: {
      type: Array
    },
    artistName: {
      type: String
    },
    venueName: {
      type: String
    }
  },
  data: function() {
    return {
      dialog: false,
      playlistName: '',
      playlistDescription: '',
      isPublic: false,
      songNames: [],
      selectedSongIndexs: [],
      isLoading: false,
      successMessage: '',
      errorMessage: '',
      accessToken: ''
    }
  },
  created: function() {
    const setlist = this.setlist;
    setlist.forEach((setObj) => {
      setObj.song.forEach((song) => {
        this.songNames.push(song.name);
      });
    });
    this.playlistName = `${this.artistName} Live at ${this.venueName}`;
    this.accessToken = `Bearer ${localStorage.getItem('accessToken')}`;
  },
  methods: {
    createPlaylist: async function() {
      this.isLoading = true;

      const songInformation = await this.getSongInformation();
      const userId = await this.getUserId();
      console.log(songInformation);
      console.log(userId);

      const url = `http://localhost:3000/api/users/${userId}/playlists`;
      const data = {
        'name': this.playlistName,
        'description': this.playlistDescription,
        'public': this.isPublic
      };
      const config = {
        headers: {
          'Authorization': this.accessToken
        }
      };

      axios.post(url, data, config)
      .then((response) => {
        console.log(response);
        const playlistId = response.data.id;
        const url = `http://localhost:3000/api/playlists/${playlistId}/tracks`;
        const data = {
          'uris': songInformation
        };
        
        axios.post(url, data, config)
        .then((response) => {
          console.log(response);
          console.log('ok');
          this.isLoading = false;
          this.successMessage = `プレイリスト「${this.playlistName}」を作成しました。`;
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.errorMessage = 'エラーが発生しました。アクセストークンを取得してください。';
        });

      })
      .catch((error) => {
        console.log(error);
        this.isLoading = false;
        this.errorMessage = 'エラーが発生しました。アクセストークンを取得してください。';
      });
    },
    getSongInformation: async function() {
      const selectedSongs = [];
      const songInformation = [];
      this.sortSongIndex();

      this.selectedSongIndexs.forEach((index) => {
        selectedSongs.push(this.songNames[index]);
      });

      for (let i = 0; i < selectedSongs.length; i++) {
        const track = `track:${selectedSongs[i]}`;
        const artist = `artist:${this.artistName}`;
        const params = new URLSearchParams({
          q: track + ' ' + artist,
          type: 'track',
          limit: '1'
        });
        const url = `http://localhost:3000/api/search?${params.toString()}`;
        const config = {
          headers: {
            'Authorization': this.accessToken
          }
        };
        
        await axios.get(url, config)
        .then((response) => {
          console.log(response);
          songInformation.push(response.data.tracks.items[0].uri);
        })
        .catch((error) => {
          console.log(error);
        });
      }

      return songInformation;
    },
    getUserId: async function() {
      const url = 'http://localhost:3000/api/me';
      const config = {
        headers: {
          'Authorization': this.accessToken
        }
      };

      const userId = await axios.get(url, config)
      .then((response) => {
        console.log(response);
        return response.data.id;
      })
      .catch((error) => {
        console.log(error);
      });

      return userId;
    },
    addSongIndex: function() {
      const tmpArray = [];
      for (let i = 0; i < this.songNames.length; i++) {
        tmpArray.push(i);
      }

      this.selectedSongIndexs = tmpArray;
    },
    removeSongIndex: function() {
      this.selectedSongIndexs = [];
    },
    sortSongIndex: function() {
      this.selectedSongIndexs.sort((a, b) => {
        return a - b;
      });
    }
  }
};
</script>
