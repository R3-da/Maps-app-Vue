import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiZWRkcm9zYWxlcyIsImEiOiJjbG1qbTJsNjUwNGlwMmtxaWJtNjQ2eG91In0._O6LyUEYcxC8JY_Eh5hlbQ';

if (!navigator.geolocation) {
  alert('Tu navegador necesita poder acceder a la Geolocalización');
  throw new Error('Tu navegador necesita poder acceder a la Geolocalización');
}

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
