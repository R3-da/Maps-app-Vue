import { defineComponent, onMounted, ref, watch } from 'vue';
import { usePlacesStore } from '@/composables';
import Mapboxgl from 'mapbox-gl';

export default defineComponent({
  name: 'MapView',
  setup() {

    const mapElement = ref<HTMLDivElement>();
    const { userLocation, isUserlocationReady } = usePlacesStore();

    const initMap = async () => {
      // Guard instances
      if ( !mapElement.value ) throw new Error('Element not found!');
      if ( !userLocation.value ) throw new Error('User location not found!');
      
      await Promise.resolve();  // <--- This line helps to finish all async process to make a right build of the Map rendered on the browser

      const map = new Mapboxgl.Map({
        container: mapElement.value, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 15, // starting zoom
      });
    }

    onMounted(() => {
      if (isUserlocationReady.value) 
        return initMap();
    });

    watch( isUserlocationReady, ( newVal ) => {
      if (isUserlocationReady.value) initMap();
    })

    return {
      isUserlocationReady,
      mapElement
    }
  }
});
