import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
export default defineNuxtPlugin((NuxtApp)=>{
    NuxtApp.vueApp.use(Toast, {
        rtl: true,
        position: "top-right",
        timeout: 2000,
     bodyClassName: ["custom-class-1"]
    })
})