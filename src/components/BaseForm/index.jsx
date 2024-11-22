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
          renderContent: () => {
            return [<span>11111</span>];
          },
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
  },
  emits: ["update:modelValue"],
  setup(props, { expose, emit }) {
    const form = ref({
     });
    console.log("props", props.fields);
    const formConfigList = computed(() => {
      return computedFormItem(props.fields, props.grid, form.value);
    });
    console.log("formConfigList", formConfigList.value);

    onMounted(() => {
      props.fields.forEach((item) => {
        form.value[item.value] = "";
      });
      console.log("form.value", form.value);
    });

    const handleInput = (value, field) => {
      console.log('value', value)
      form.value[field._value] = value;
    };

    const renderFormItem = (item) => {
      const Component = resolveComponent(item._component);
      return h(Component, {
        ...item.props,
        value: form.value[item._value],
        onInput: (value) => handleInput(value, item),
      });
    };

    return () => {
      return (
        <>
          <el-form>
            {formConfigList.value.map((itemArr, indexArr) => {
              return (
                <el-row>
                  {itemArr.map((item, index) => {
                    return (
                      <el-col span={item._span} key={index}>
                        <el-form-item
                          label={item._label}
                          prop={item._value}
                          rules={item._rules}
                        >
                          {renderFormItem(item)}
                        </el-form-item>
                      </el-col>
                    );
                  })}
                </el-row>
              );
            })}
          </el-form>
        </>
      );
    };
  },
});
