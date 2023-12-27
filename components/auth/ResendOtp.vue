<template>
    <ClientOnly>
        <div class="d-flex align-items-center">
        
            <div class="mt-3 me-3" v-if="!showresendbutton">
                <vue-countdown :time="60 * 100" :transform="transformSlotProps" @end="onCountdownEnd"
                    v-slot="{ minutes, seconds }">
                    {{ minutes }}:{{ seconds }}
                </vue-countdown>
            </div>
    
                <button @click="resend" v-else class="btn-gray">ارسال مجدد
                    <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
                </button>
         
        </div>
    </ClientOnly>
</template>
<script setup>
import {useToast} from "vue-toastification";
import VueCountdown from '@chenfengyuan/vue-countdown';
const showresendbutton = ref(false);
const toast = useToast();
const errors = ref([])
const emit = defineEmits(['resendOtpErrors']);
const loading = ref(false)
function onCountdownEnd() {
    showresendbutton.value = true;
}
function transformSlotProps(props) {
    const formattedProps = {};
    Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ? `0${value}` : String(value);
    });
    return formattedProps;
}
async function resend(){
    try {
        loading.value = true;
        await $fetch('/api/auth/resendOtp', {
            method : 'POST'
        })

        showresendbutton.value = false;
        toast.success("کد ورود دوباره برای شما ارسال شد")
        
    } catch (error) {
         emit('resendOtpErrors', Object.values(error.data.data.message).flat())
    }finally{
        loading.value = false;
    }
}
</script>
