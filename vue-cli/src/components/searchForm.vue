<template>
    <div>
        <input type="text" class="rounded-md py-2 px-2 border-2 border-green-100 transition focus:border-green-300 focus:outline-none w-full text-gray-500 m-1" placeholder="Keywords"
        :value="value"
        @input="onInput">
        <p class="text-red-600 text-sm ml-1" :class="isLessThanExpected ? 'block' : 'hidden'"> must be longer than 3 characters</p>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    computed: {
        isLessThanExpected() {
          return this.value.length < 3 && this.value.length > 0
        }
    },
    methods: {
        onInput(event) {
          this.$emit('update:value', event.target.value)
        }
      }
}
</script>