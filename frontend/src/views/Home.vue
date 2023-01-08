<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <Alert :text="errorMessage" type="error" v-if="errorMessage"></Alert>
      </v-col>
      <v-col cols="12">
        <div class="ma-6">
          <h1>コンサート・ライブのセットリストからSpotifyのプレイリストを作成するアプリです。</h1>
          <p class="mt-10">このアプリではSpotifyのWeb APIを利用するためログインが必要です。</p>
          <p>使い方</p>
          <p>1. 以下の「LOG IN WITH SPOTIFY」をクリックしてSpotifyアカウントを連携してください。</p>
          <p>2. メニューの検索からプレイリストを作成したいアーティストを検索してください。</p>
          <p>3. 検索結果より「コンサート・ライブ一覧」をクリックするとセットリストが表示されます。</p>
          <p>4. セットリストの一覧から「セットリストを見る」をクリックするとモーダルが開くのでプレイリストの名前と説明を入力して「プレイリストを作成」をクリックしてください。</p>
          <p>5. Spotifyにプレイリストが作成されます。</p>
          <Auth @error-event="errorMessage=$event"></Auth>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Auth from '../components/Auth.vue';
import Alert from '../components/Alert.vue';

export default {
  name: 'Home',
  components: {
    Auth: Auth,
    Alert: Alert
  },
  data: function() {
    return {
      errorMessage: ''
    }
  }
};
</script>
