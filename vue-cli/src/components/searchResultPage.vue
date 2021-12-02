<template>
    <div>
        <div class="m-5">{{ $store.state.pagination.total }} search results found. Currently on page {{ $store.state.pagination.page }}</div>
        <search-result></search-result>
    </div>
</template>
<script>
import searchResult from './searchResult.vue'
export default {
    components: {
      'searchResult': searchResult
    },
    async created() {
      if (this.$store.state.resultList.length === 0) {
        await this.$router.replace('/')
      }
    },
}
</script>