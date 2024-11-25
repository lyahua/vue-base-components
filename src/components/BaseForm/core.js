import { unref } from 'vue'
import { isObject, isFunction, cloneDeep } from 'lodash';


import { elementsMaps } from './elements-map'

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

/**表单项重新配置 */
export const computedFormItem = (fields, grid, form) =>{
    let resultFieldsList = [];
    const colneFields = cloneDeep(fields)
    if (grid.length > 0) {
        let startIndex = 0;
        for (let i = 0; i < grid.length; i++) {
            let endIndex = startIndex + grid[i].length

            console.log('start', startIndex, endIndex)
            let dimensionTwo = colneFields.slice(startIndex, endIndex);
            dimensionTwo.forEach((item, index) => {
                item.span = grid[i][index]
            })
            resultFieldsList.push(dimensionTwo)

            startIndex = startIndex + grid[i].length;
        }
    } else {
        for (let i = 0; i < colneFields.length; i++) {
            resultFieldsList.push([Object.assign(colneFields[i], { span: 24 })])
        }
    }
    // console.log('resultFieldsList', resultFieldsList)
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

            // console.log('config', config)
            return config
        })
    })
}