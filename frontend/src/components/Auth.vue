<template>
  <div>
    <v-btn rounded width="250px" color="green" class="mr-4 mb-4" @click="getAuth()" v-if="isActive">LOG IN WITH SPOTIFY</v-btn>
    <v-btn rounded width="250px" color="green" class="mr-4 mb-4" @click="setAccessToken()" v-if="!isActive">LOG IN WITH SPOTIFY</v-btn>
    <v-btn rounded width="150px" color="red" class="mb-4" @click="removeToken()" v-if="!isActive">LOG OUT</v-btn>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Auth',
  data: function() {
    return {
      isActive: true,
      errorMessage: ''
    }
  },
  created: async function() {
    if (this.$route.query.code) {
      await this.setRefreshToken();
      await this.setAccessToken();
      this.isActive = false;
      if (this.errorMessage === '') {
        location.href = 'http://localhost:8080';
      }
    }

    if (localStorage.getItem('refreshToken')) {
      this.isActive = false;
    }
  },
  methods: {
    getAuth: function() {
      const url = 'http://localhost:3000/login';
      location.href = url;
    },
    getRefreshToken: async function() {
      const code = this.$route.query.code;
      const url = `http://localhost:3000/callback?code=${code}`;

      const refreshToken = await axios.get(url)
      .then((response) => {
        console.log(response);
        return response.data.refresh_token;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });

      return refreshToken;
    },
    getAccessToken: async function() {
      const refreshToken = localStorage.getItem('refreshToken');
      const url = `http://localhost:3000/refresh_token?refresh_token=${refreshToken}`;

      const accessToken = await axios.get(url)
      .then((response) => {
        console.log(response);
        return response.data.access_token;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });

      return accessToken;
    },
    setRefreshToken: async function() {
      const refreshToken = await this.getRefreshToken();
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      } else {
        this.errorMessage = '認証エラーが発生しました。';
        this.$emit('error-event', this.errorMessage);
      }
    },
    setAccessToken: async function() {
      const accessToken = await this.getAccessToken();
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      } else {
        this.errorMessage = '認証エラーが発生しました。';
        this.$emit('error-event', this.errorMessage);
      }
    },
    removeToken: function() {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      location.href = 'http://localhost:8080';
    }
  }
};
</script>
