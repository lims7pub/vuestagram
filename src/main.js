import { createApp } from 'vue'
import App from './App.vue'
import Mitt from 'mitt'
let emitter = Mitt();
let app = createApp(App)
app.config.globalProperties.emitter = emitter;

import store from './store.js'

app.use(store).mount('#app')
