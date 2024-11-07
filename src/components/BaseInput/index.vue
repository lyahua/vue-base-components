<template>
    <div>
        <el-input v-model="currentValue" v-bind="attrs" >
             <!-- 插槽 -->
             <template v-for="(item ,key) in slots" v-slot:[key]>
                <slot :name="key"></slot>
             </template>
        </el-input>
    </div>
</template>

<script>
export default {
    name: 'BaseInput',
    inheritAttrs: false
}
</script>

<script setup>
import {computed, useSlots, useAttrs } from 'vue';

const slots = useSlots();
const attrs = useAttrs()
const props = defineProps(['modelValue'])

const emit = defineEmits(['update:modelValue'])

const currentValue = computed({
    get(){
        return props.modelValue
    },
    set(value){
        emit('update:modelValue', value)
    }
})

</script>

<style lang="css" scoped></style>