<template>
    <el-form :model="form">
        <el-row v-for="(itemArr, indexArr) in formConfigList" :key="indexArr">
            <el-col v-for="(item, index) in itemArr" :key="index" :span="item._span">
                <el-form-item :label="item._label" :prop="item._value" :rules="item._rules" v-if="item._isShow">
                    <template v-if="item._renderContent">
                        <!-- {{JSON.stringify(item._renderContent)}} -->
                         <!-- {{h(item._renderContent)}} -->
                    </template>
                    <component :is="item._component" :options="item._options" v-bind="item._props" v-model="form[item._value]" v-else/>
                </el-form-item>
            </el-col>
        </el-row>

        <!--默认插槽  -->
        <slot></slot>
    </el-form>
</template>

<script setup lang="jsx">
import { ref, computed, unref } from 'vue';

import { computedFormItem } from './core'
const props = defineProps({
    grid: {
        type: Array,
        default: []
    },
    fields: {
        type: Array,
        default: () => ([
            {
                label: '姓名1',
                value: 'name',
                type: 'input',
                isRequired: true,
                isShow: true,
                renderContent:()=>{
                     return [<span>11111</span>]
                 }

            },
            {
                label: '姓名',
                value: 'name',
                type: 'input',
                isRequired: true,
                props: {
                    type: 'textarea'
                },
                isShow: true

            },
            {
                label: '姓名',
                value: 'name',
                type: 'input',
                isRequired: true,

            },
            {
                label: '爱好',
                value: 'hobby',
                type: 'select',
                options:[
                    {label: '吃饭', value: '吃饭'},
                    {label: '睡觉', value: '睡觉'},
                    {label: '打豆豆', value: '打豆豆'},
                ],
                isShow:(obj)=>{
                    console.log('obj', obj)
                    return obj.name === '111'
                }
            }
        ])
    }
})

const form = ref({})

const formConfigList = computed(() => {
    return computedFormItem(props.fields, props.grid, form.value)
})

</script>

<style lang="css" scoped></style>