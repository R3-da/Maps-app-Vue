import { defineComponent, onMounted, ref, watch } from 'vue';
import { useMapStore, usePlacesStore } from '@/composables';
import mapboxgl from 'mapbox-gl';

export default defineComponent({
  name: 'MapView',
  setup() {

    const mapElement = ref<HTMLDivElement>();
    const { userLocation, isUserlocationReady } = usePlacesStore();
    const { setMap } = useMapStore();

    const initMap = async () => {
      // Guard instances
      if ( !mapElement.value ) throw new Error('Element not found!');
      if ( !userLocation.value ) throw new Error('User location not found!');
      
      await Promise.resolve();  // <--- This line helps to finish all async process to make a right build of the Map rendered on the browser

      const map = new mapboxgl.Map({
        container: mapElement.value, // container ID
        center: userLocation.value,
        zoom: 15, // starting zoom
      });

      map.on("load", () => {
        // This doesn't work with the standard 3.0 style, so
        // first enable the 2.0 style back in
        map.on("style.load", () => {
          map.addSource("mapbox-dem", {
            type: "raster-dem",
            url: "mapbox://mapbox.mapbox-terrain-dem-v2",
            tileSize: 512,
            maxzoom: 14
          });
          // add the DEM source as a terrain layer with exaggerated height
          map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
        });
      });

      // Pop-out in the marker
      const myLocationPopup = new mapboxgl.Popup()
        .setLngLat(userLocation.value)
        .setHTML(
          `
            <h3>Here I'm</h3>
            <p>Currently in Villa de Alvarez</p>
          `
        )

      // Marker
      const myLocationMarker = new mapboxgl.Marker()
        .setLngLat(userLocation.value)
        .setPopup(myLocationPopup)
        .addTo(map);

      setMap(map);
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
