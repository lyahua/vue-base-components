
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

/**自定义组件全局注册 */
import BaseInput from '@/components/BaseInput/index.vue'
import BaseSelect from '@/components/BaseSelect/index.vue'
import BaseForm from '@/components/BaseForm/index.vue'


const app = createApp(App)

app.component('BaseInput', BaseInput)
app.component('BaseSelect', BaseSelect)
app.component('BaseForm', BaseForm)

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
