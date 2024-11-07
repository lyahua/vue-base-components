<template>
    <el-select v-model="currentValue" v-bind="attrs">
        <!-- 插槽 -->
        <template v-for="(item ,key) in slots" v-slot:[key]>
            <slot :name="key"></slot>
        </template>
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</template>

<script>
export default {
    name: 'BaseSelect',
    inheritAttrs: false
}
</script>

<script setup>
import { computed, useAttrs, useSlots } from 'vue';

const attrs = useAttrs();
const slots = useSlots();

const props = defineProps({
    modelValue: {
        type: [String, Number, Array],
        default: undefined
    },
    options: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['update:modelValue'])

const currentValue = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>

<style lang="css" scoped></style>