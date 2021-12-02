/* eslint-disable */
<template>  
      <div class="flex justify-center sm-auto overflow-auto " id="app">
        <div class="shadow-lg rounded-md w-2/3 m-12">
        <loading-bar :isLoading="isLoading"></loading-bar>
          <div class="m-3">
            <div class="flex justify-center items-center">
                <h2 class="text-gray-500 text-2xl">Search Subtitle Youtube</h2>
            </div>
            <div class="flex flex-col m-2">
              <search-form v-model:value="keyword" />
              <div class="p-1">
                <app-button text="Clear" @click="clear"></app-button>
              </div>
              <br>
                <div class="m-1 flex flex-row" v-if="$store.state.pagination['total'] > 0">
                  <app-button class="mr-1" :is-disabled="!$store.state.pagination['first']" text="First" @click="navigate('first')"></app-button>
                  <app-button class="mr-1" :is-disabled="!$store.state.pagination['prev']" text="Prev" @click="navigate('prev')"></app-button>
                  <app-button class="mr-1" :is-disabled="!$store.state.pagination['next']" text="Next" @click="navigate('next')"></app-button>
                  <app-button class="mr-1" :is-disabled="!$store.state.pagination['last']" text="Last" @click="navigate('last')"></app-button>
                </div>
              <router-view></router-view>
              <app-dialog></app-dialog>
            </div> 
          </div>
        </div>
      </div>
</template>
<script>
import searchForm from './components/searchForm.vue'
import appButton from './components/appButton.vue'
import pDebounce from './utils/pDbounce'
import loadingBar from './components/loadingBar.vue'
import appDialog from './components/appDialog.vue'
export default {
  components:{
    'searchForm': searchForm,
    'appButton': appButton,
    'loadingBar':loadingBar,
    'appDialog':appDialog
  },
  data(){
    return{
      keyword:'',
      isLoading:false
    }
  },
  computed: {
      url: {
        get() {
            return this.$store.state.url
        },
        set(url) {
            this.$store.commit('SET_URL', { url })
        }
      }
  },
  watch: {
      keyword: pDebounce(async function keywordHandler(keyword) {
          if (keyword && keyword.length >= 3) {
            await this.search(keyword, this.url)
          } else {
            this.resetData()
          }
        }, 250)
  },
  methods: {
        async search(keyword, url, pagination) {
          try {
            this.isLoading = true
            const response = await fetch(
              pagination
                ? pagination
                : `https://cari-teks-video-api.vercel.app/api/search?&q=${keyword}&url=${encodeURIComponent(
                  url
                )}`
            ).then( _ => (_.ok ? _.json() : []))

            this.$store.commit('SET_RESULT_LIST', { resultList: response.data })
            this.$store.commit('SET_PAGINATION', {
              first: response.first,
              last: response.last,
              prev: response.prev,
              next: response.next,
              total: response.total,
              page: response.page
            })
            await this.$router.push({ name: 'SearchResultPage', params: { page: response.page } })

          } catch (error) {
          } finally {
            setTimeout(() => {
              this.isLoading = false
            }, 1000)
          }
        },
        async navigate(type) {
          if (!this.$store.state.pagination[type]) {
            return
          }
          await this.search(this.keyword, this.url, this.$store.state.pagination[type])
        },
        async clear() {
          this.keyword = ''
          this.resetData()
          await this.$router.replace('/')
        },
        resetData() {
          this.$store.commit('SET_RESULT_LIST', { resultList: [] })
          this.$store.commit('RESET_PAGINATION')
        }
  },
}
</script>

<style>
  /* Taken from: http://dev.gojko.net/web/2015/09/19/material-design-progress-pure-css.html */
.progress,
.progress:before {
  height: 0.25rem;
}

.progress:before {
  width: 100%;
}

.progress {
  background-color: rgb(209,250,229);
  display: flex;
}

.progress:before {
  background-color: rgb(52,211,153);
  content: '';
  animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes running-progress {
  0% {
    margin-left: 0px;
    margin-right: 100%;
  }

  50% {
    margin-left: 25%;
    margin-right: 0%;
  }

  100% {
    margin-left: 100%;
    margin-right: 0;
  }
}

/* Custom */
.form-box {
  height: fit-content;
}

.pagination[disabled] {
  opacity: 0.5;
  cursor: default;
}

.pagination[disabled]:hover {
  background: rgb(255, 255, 255);
}

.embed {
  padding-top: 56.25%;
}

.embed iframe {
  border: 0;
}
</style>