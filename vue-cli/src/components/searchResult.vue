<template>
    <div>
        <app-search-result-item 
             v-for="(result, i) in $store.state.resultList" :key="i"
             :result-text="result.text"
             :result-start="result.start"
        ></app-search-result-item>
    </div>
</template>
<script>
import searchResultItem from './searchResultItem.vue'
export default {
 components: {
      'AppSearchResultItem': searchResultItem
 }
}
</script>