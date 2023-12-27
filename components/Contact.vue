<template>
    <section class="book_section layout_padding">
        <div class="container">
            <div class="heading_container">
                <h2>
                    تماس با ما
                </h2>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form_container">
                        <div v-if="errors.length > 0" class="alert alert-danger">
                            <ul class="mb-0">
                                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                            </ul>
                        </div>
                        <form @submit.prevent="send">
                            <div>
                                <input type="text" v-model="formdata.name" class="form-control"
                                    placeholder="نام و نام خانوادگی" />
                            </div>
                            <div>
                                <input type="email" v-model="formdata.email" class="form-control text-start"
                                    placeholder="ایمیل" />
                            </div>
                            <div>
                                <input type="text" v-model="formdata.subject" class="form-control"
                                    placeholder="موضوع پیام" />
                            </div>
                            <div>
                                <textarea rows="10" style="height: 100px" class="form-control" v-model="formdata.text"
                                    placeholder="متن پیام"></textarea>
                            </div>
                            <div class="btn_box">
                                <button class="btn">
                                    ارسال پیام
                                    <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="map_container ">
                        <div id="map"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
const errors = ref([])
const loading = ref(false)
const formdata = reactive({
    name: "",
    email: "",
    subject: "",
    text: ""
})
const { $leaflet } = useNuxtApp();
const { public: { apiBase } } = useRuntimeConfig()
async function send() {
    try {
        loading.value = true;
        errors.value = [];
        const data = await $fetch(`${apiBase}/contact-us`, {
            method: 'POST',
            body: formdata
        })
        toast.success("پیام شما با موفقیت ارسال شد")
    } catch (error) {
        errors.value = Object.values(error.data.message).flat()
        toast.error("تمامی فیلد ها را وارد کنید")
    }
    finally {
        loading.value = false;
    }
}


onMounted(() => {
    let map = $leaflet.map('map').setView([35.700105, 51.400394], 14);
    // let tiles = $leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    //     maxZoom: 18,
    //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    //         'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //     id: 'mapbox/streets-v11',
    //     tileSize: 512,
    //     zoomOffset: -1
    // }).addTo(map);

    let tiles = $leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    let marker = $leaflet.marker([35.700105, 51.400394], {
        icon: $leaflet.icon({
            popupAnchor: [12, 6],
            iconUrl: '/map/marker-icon.png',
            shadowUrl: '/map/marker-shadow.png'
        })
    }).addTo(map)
        .bindPopup('<b>سلام</b><br/>مااینجاییم').openPopup();
})

</script>

<style>

</style>