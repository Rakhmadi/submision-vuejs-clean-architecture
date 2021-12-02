<template>
    <button class="rounded-md py-1 px-2 bg-green-400 text-white"
     :disabled="isDisable"
     @click="onClick">{{text}}</button>
</template>
<script>
export default {
           props:{
            text:{
                type:String,
                default:''
            },
            isDisable:{
                type:Boolean,
                default:false
            }
        },
        methods: {
            onCilck(event){
                this.$emit('click',event)
            }
        },
    }
</script>
