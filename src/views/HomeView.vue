<template>
  <MapView />
  <SearchBar />
  <MyLocationBtn />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePlacesStore } from "@/composables/usePlacesStore";

import MapView from "@/components/mapview/MapView.vue";
import SearchBar from "@/components/searchbar/SearchBar.vue";
import MyLocationBtn from "@/components/my-location-btn/MyLocationBtn.vue";

export default defineComponent({
  name: 'HomeView',
  components: { MapView, MyLocationBtn, SearchBar },
  setup() {
    usePlacesStore();
  }
});
</script>
