import { createApp } from 'vue'
import App from './App.vue'
import Mitt from 'mitt'
let emitter = Mitt();
let app = createApp(App)
app.config.globalProperties.emitter = emitter; //모든 컴포넌트에서 사용가능

app.mount('#app')
