import { MutationTree } from 'vuex';
import { MapState } from './state';
import Mapboxgl from 'mapbox-gl';
import { Feature } from "@/interfaces/places";

const mutation: MutationTree<MapState> = {
  setMap(  state, map: Mapboxgl.Map ) {
    state.map = map;
  },
  
  setPlaceMarkers(state, places: Feature[]) {
    // Delete markers
    state.markers.forEach( marker => marker.remove() );
    state.markers = [];
    
    if (!state.map) return;

    // Create new markers
    for (const place of places) {
      const [ lng, lat ] = place.center;
      
      // Pop-out in the marker
      const popup = new Mapboxgl.Popup()
        .setLngLat([ lng, lat ])
        .setHTML(
          `
            <h3>${place.text}</h3>
            <p>${place.place_name}</p></p>
          `
        )

      // Marker
      const marker = new Mapboxgl.Marker()
        .setLngLat([ lng, lat ])
        .setPopup(popup)
        .addTo(state.map);

      state.markers.push(marker);
    }
  }
}


export default mutation;