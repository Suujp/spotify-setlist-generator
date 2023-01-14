# spotify-setlist-generator
![gif](https://user-images.githubusercontent.com/115899129/212494007-55b7b919-4863-4cb5-9370-45ab235a57ee.gif)

## 概要
コンサート・ライブのセットリストからSpotifyのプレイリストを作成するアプリです。<br>
自分が観に行ったライブをプレイリストとして保存したり、観に行く予定のアーティストのプレイリストを作成し予習したりすることができます。

## 必要要件
以下のAPIを利用しています。
- Spotify API(Spotify Client ID, Spotify Client Secret)
- Setlist.fm API(Setlist.fm API KEY)

Setlist.fm API KEY, Spotify Client ID, Spotify Client Secretの配置は以下です。
1. backendフォルダに「.env」ファイルを作成
2. 「.env」ファイルに以下のように環境変数を記述
```
API_KEY=''
SPOTIFY_CLIENT_ID=''
SPOTIFY_CLIENT_SECRET=''
REDIRECT_URI='http://localhost:8080/'
```
3. 各変数に取得したSetlist.fm API KEY, Spotify Client ID, Spotify Client Secretを代入

## 使い方
バックエンドのサーバーを起動します。
```
cd backend
npm install
node app.js
```
フロントエンドのサーバーを起動します。
```
cd frontend
npm install
npm run serve
```

## 機能
- アーティストの検索
- セットリストの閲覧
- セットリストからSpotifyプレイリストの作成
- 作成したプレイリストの確認
