import { usePlacesStore } from '@/composables';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MapView',
  setup() {

    const { isLoading, userLocation, isUserlocationReady } = usePlacesStore();

    return {
      isLoading,
      userLocation,
      isUserlocationReady
    }
  }
});
