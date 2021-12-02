<template>
    <div>
    <Portal target="body_id" v-if="$store.state.currentResultStart && embedUrl">
      <div class="popup">
  
        <div class="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-black bg-opacity-50">
          <div class="bg-white rounded-lg w-1/2 p-3">
            <div class="embed relative block p-0 overflow-hidden">
                  <iframe 
                  class="top-0 left-0 bottom-0 w-full h-full"
                  :src="embedUrl"
                  frameborder="0"
                  allow="accelerometer; autoplay;encrypted-media;"
                  allowfullscreen
                  data-cookieconsent="marketing"
                  ></iframe>
            </div>
            <app-button
              text="Close"
              class="mt-3"
              @click="closeDialog"
            ></app-button>
          </div>
        </div>
      </div>
   </Portal>
    </div>
</template>
<script>
import appButton from './appButton.vue'
export default {
    components:{
      'appButton':appButton
    },
    computed: {
      youtubeId() {
        // RegEx taken from: https://stackoverflow.com/a/6904504
        return /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/gi.exec(
          this.$store.state.url || ''
        )
      },
      embedUrl() {
        return `https://www.youtube-nocookie.com/embed/${this.youtubeId[1]}?autoplay=1&start=${this.$store.state.currentResultStart}`
      }
    },
    methods: {
      closeDialog() {
        this.$store.commit('SET_CURRENT_RESULT_START', { 
          currentResultStart: undefined
         })
      }
    }
}
</script>