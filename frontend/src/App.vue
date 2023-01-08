<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>プレイリスト作成アプリ</v-toolbar-title>
    </v-app-bar>
    
    <v-navigation-drawer app v-model="drawer">
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">メニュー</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        
        <v-list nav dense>
          <v-list-item v-for="item in items" :key="item.name" :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      drawer: null,
      items: [
        {
          name: 'ホーム',
          icon: 'mdi-home',
          link: '/'
        },
        {
          name: '検索',
          icon: 'mdi-magnify',
          link: '/search'
        },
        {
          name: 'プレイリスト',
          icon: 'mdi-play',
          link: '/playlist'
        }
      ]
    }
  }
};
</script>
