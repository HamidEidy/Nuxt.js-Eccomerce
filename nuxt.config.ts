// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
       
                dir: "rtl",
                lang: "fa",
            },

        },
    },

    runtimeConfig: {
        public: {
            apiBase: "Your_API",
        },
    },

    css: ["~/assets/css/main.css" , "~/assets/scss/main.scss"],

    modules: ["@formkit/nuxt", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],

    build: {
        transpile: ["vue-toastification"],
    },
});
