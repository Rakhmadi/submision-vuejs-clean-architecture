<template>
  <div class="shadow-md rounded-md m-1 p-4 flex flex-col">
    <span v-html="resultText" class="text-xl text-gray-500 mb-3"></span>
    <app-button
    :text="buttonText"
    @click="onPlay"
    ></app-button>
  </div>
</template>
<script>
import appButton from './appButton.vue'

export default {
    props: {
      resultStart: {
        type: Number,
        default: 0
      },
      resultText: {
        type: String,
        default: ''
      }
    },
    components:{
      'appButton':appButton
    },
    computed: {
      buttonText() {
        var date = new Date(0);
        date.setSeconds(this.resultStart);
        var timeString = date.toISOString().substr(11, 8);
        return `Play video at ${timeString}`
      }
    },
    methods: {
      onPlay() {
        this.$store.commit('SET_CURRENT_RESULT_START', {
          currentResultStart: this.resultStart
        })
        console.log('x')
      }
    }
}
</script>

  