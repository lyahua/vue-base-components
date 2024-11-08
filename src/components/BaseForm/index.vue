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
import { ref, computed } from 'vue';

import { elementsMaps } from './elements-map'
import { unref } from 'vue';
// import { isFunction, isObject } from 'element-plus/es/utils';
import { isObject, isFunction, cloneDeep } from 'lodash';

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

const inputType = ['input']
/**获取rules */
const getRules = (config) => {
    const { isRequired, rules, label, type } = config

    // 当没有配置rules，只写了required的时候的校验
    if (typeof isRequired === 'boolean' && isRequired && !rules) {
        let text = ''
        let trigger = ''
        if (inputType.includes(type)) {
            text = '请输入' + label;
            trigger = 'change'
        } else {
            text = '请选择' + label
            trigger = 'blur'
        }

        return {
            required: true,
            message: text,
            trigger
        }
    } else if (isRequired && rules) {
        return rules
    } else {
        return null
    }

}

/**获取placeholder */
const getPlaceHolder = (config) => {
    const { label, type } = config;
    if (inputType.includes(type)) {
        return {
            placeholder: '请输入' + label
        }
    } else {
        return {
            placeholder: '请选择' + label
        }
    }
}

const formConfigList = computed(() => {
    let resultFieldsList = [];
    const colneFields = cloneDeep(props.fields)
    if (props.grid.length > 0) {
        let startIndex = 0;
        for (let i = 0; i < props.grid.length; i++) {
            let endIndex = startIndex + props.grid[i].length

            console.log('start', startIndex, endIndex)
            let dimensionTwo = colneFields.slice(startIndex, endIndex);
            dimensionTwo.forEach((item, index) => {
                item.span = props.grid[i][index]
            })
            resultFieldsList.push(dimensionTwo)

            startIndex = startIndex + props.grid[i].length;
        }
    } else {
        for (let i = 0; i < colneFields.length; i++) {
            resultFieldsList.push([Object.assign(colneFields[i], { span: 24 })])
        }
    }
    console.log('resultFieldsList', resultFieldsList)
    return resultFieldsList.map(itemArr => {
        return itemArr.map(item => {
            let config = { ...item }
            const mapComponent = elementsMaps[config.type || 'input']
            config._label = config.label;
            config._value = config.value;
            config._component = mapComponent.component;
            config._props = isObject(config.props) ? Object.assign({}, mapComponent.props, getPlaceHolder(config), config.props) : Object.assign(mapComponent.props, getPlaceHolder(config)); // 合并Base组件属性
            config._isShow = (config.isShow && isFunction(config.isShow)) ? !!config.isShow(unref(form)) : config.hasOwnProperty('isShow') ? config.isShow : true;
            config._rules = getRules(config)
            config._span = config.span || 6
            config._options = config.options
            config._renderContent = isFunction(config.renderContent)? config.renderContent(unref(form)): null

            console.log('config', config)
            return config
        })
    })

})

</script>

<style lang="css" scoped></style>