import {
  ref,
  defineComponent,
  computed,
  onMounted,
  resolveComponent,
  h,
} from "vue";

import { computedFormItem } from "./core";

export default defineComponent({
  props: {
    grid: {
      type: Array,
      default: [],
    },
    fields: {
      type: Array,
      default: () => [
        {
          label: "姓名1",
          value: "name",
          type: "input",
          isRequired: true,
          isShow: true,
          // renderContent: () => {
          //   return [<span>11111</span>];
          // },
        },
        {
          label: "姓名",
          value: "name2",
          type: "input",
          isRequired: true,
          props: {
            type: "textarea",
          },
          isShow: true,
          onInput: (value) => {
            console.log("value", value);
          },
        },
        {
          label: "姓名",
          value: "name1",
          type: "input",
          isRequired: true,
        },
        {
          label: "爱好",
          value: "hobby",
          type: "select",
          options: [
            { label: "吃饭", value: "吃饭" },
            { label: "睡觉", value: "睡觉" },
            { label: "打豆豆", value: "打豆豆" },
          ],
          isShow: (obj) => {
            console.log("obj", obj);
            return obj.name === "111";
          },
        },
      ],
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
  inheritAttrs: false,
  emits: [],
  setup(props, { expose, emit }) {
    const form = ref({});
    const formConfigList = computed(() => {
      return computedFormItem(props.fields, props.grid, form.value);
    });

    onMounted(() => {
      props.fields.forEach((item) => {
        form.value[item.value] = "";
      });
    });

    const handleInput = (value, field) => {
      form.value[field._value] = value;
      if (field.onInput) {
        field.onInput(value);
      }
      if (field.onChange) {
        field.onChange(value);
      }
    };

    const renderFormItem = (item) => {
      return (
        <el-form-item
          label={item._label}
          prop={item._value}
          rules={item._rules}
        >
          {item._renderContent ? item._renderContent : renderComponent(item)}
        </el-form-item>
      );
    };

    const renderComponent = (item) => {
      const Component = resolveComponent(item._component);
      return h(Component, {
        ...item.props,
        options: item._options,
        modelValue: form.value[item._value],
        "onUpdate:modelValue": (value) => handleInput(value, item),
      });
    };

    const renderElRow = () => {
      return (
        <>
        
        </>
      )
    };

    const renderGrid = () => {
      return (
        <>
          {formConfigList.value.map((itemArr, indexArr) => {
            return (
              <el-row>
                {itemArr.map((item, index) => {
                  return (
                    <el-col span={item._span} key={index}>
                      {item._isShow ? renderFormItem(item) : ""}
                    </el-col>
                  );
                })}
              </el-row>
            );
          })}
        </>
      );
    };

    return () => {
      return (
        <>
          <el-form model={form} inline={props.inline}>
            {renderGrid()}
          </el-form>
        </>
      );
    };
  },
});
