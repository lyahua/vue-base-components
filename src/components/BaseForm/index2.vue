<script lang="jsx">
import {ref, defineComponent } from 'vue'

import { computedFormItem } from './core'

export default defineComponent({
  props: {
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
          renderContent: () => {
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
          options: [
            { label: '吃饭', value: '吃饭' },
            { label: '睡觉', value: '睡觉' },
            { label: '打豆豆', value: '打豆豆' },
          ],
          isShow: (obj) => {
            console.log('obj', obj)
            return obj.name === '111'
          }
        }
      ])
    }

  },
  setup() {
    const form = ref()
    // const formConfigList = computed(() => {
    //   return computedFormItem(this.fields, this.grid, form.value)
    // })
    // console.log('formConfigList', formConfigList.value)
    return {
      form
    };
  },
  computed:{
    formConfigList(){
      console.log("this.33333333fields")
      return  computedFormItem(this.fields, this.grid, form.value)
    }
  },
  

  render(h) {
    console.log('h', h)
    return (
      <>
        <el-form>
          <el-form-item></el-form-item>
        </el-form>
      </>
    )
  }
});
</script>

<style lang="css" scoped></style>
