import {
    ref,
    defineComponent,
    computed,
    onMounted,
    resolveComponent,
    h,
} from "vue";
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'


export const Com1 = defineComponent({
    props: {
        a: {
            type: Number,
        }
    },
    beforeRouteEnter (to, from, next) {
        console.log('00000----000')
        next((vm) => {
            console.log('vm', to, from)
        })
    },
    setup(obj, { expose, emit, slots }) {
        // console.log('obj666', obj, expose, emit)
        console.log('%c comp1插槽', 'color:green')
        console.log('slots',slots)
        onBeforeRouteLeave((to, from) => {
            const answer = window.confirm(
                'Do you really want to leave? you have unsaved changes!'
            )
            // 取消导航并停留在同一页面上
            if (!answer) return false
        })
        onMounted(() => {
            console.log('com1 onmounted')
        })

        return () => {
            return (
                <>
                    组件1
                </>
            )
        }

    }
})

export const Com2 = defineComponent((props,{slots})=>{
    onBeforeRouteLeave((to, from) => {
        console.log('%c color, ','color: red%')
        const answer = window.confirm(
            'Do you really want to leave? you have unsaved changes!'
        )
        // 取消导航并停留在同一页面上
        if (!answer) return false
    })
    console.log(`%c Com2插槽${slots}`, 'color: red')
    console.log(slots)
    const count2 = ref(2)
    return () => {
        return (
            <>
                <hr/>
                <Com1>
                    {{
                         namedSlot: () => <div>Named Slot Content</div>,
                    }}
                </Com1>
                组件2:{count2.value}
            </>
        )
    }
})