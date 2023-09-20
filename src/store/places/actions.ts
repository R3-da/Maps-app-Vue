import { ActionTree } from 'vuex';
import { PlacesState } from './state';
import { StateInterface } from '../index';
import { searchApi } from '@/apis';


const actions: ActionTree<PlacesState, StateInterface> = {
    getInitialLocation({ commit }) {
        // TODO: Colocar loading
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => commit('setLngLat', { lng: coords.longitude, lat: coords.latitude }),
            (err) => {
                console.error(err);
                throw new Error('No Geolocation');
            }
        );
    },

    async searchPlacesByTerm({ commit, state }, query: string) {

        console.log('Vuex: ', query);

        // const resp = await searchApi(`/${ query }.json`, {
        //     params: {
        //         proximity: state.userLocation?.join(',')
        //     }
        // });
        // console.log(resp.data);
    }
}



export default actions;