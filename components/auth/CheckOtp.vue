<template>
    <div class="card-body">
         <div v-if="errors.length > 0" class="alert alert-danger">
            <ul class="mb-0">
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
        </div>
        <div class="alert alert-warning">
    فکر کن کد ورود 123456 برات پیامک شده :)
        </div>
        <div class="form_container">
        
                <div class="mb-3">
                    <label for="cellphone" class="form-label">کد ورود</label>
                    <input v-model="otp" type="text" class="form-control" id="cellphone">
                </div>
                <div class="d-flex justify-content-between align-items-center">
                <button @click="checkotp" type="submit" class="btn">
                    تایید
                    <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
                </button >
        <authResendOtp @resend-otp-errors="(err) => errors = err" />
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { useToast } from "vue-toastification";

const emit = defineEmits(['showCheckOtpForm'])

const {authUser} = useAuth();
const otp = ref(null);
const toast = useToast();
 const errors = ref([]);
const loading = ref(false);

async function checkotp() {
    if (otp.value == null) {
        toast.error("کد تایید الزامی است")
        return
    }

    const pattern = /^[0-9]{6}$/;
    if (!pattern.test(otp.value)) {
        toast.error("فرمت کد معتبر نیست")
        return;
    }

    try {
        loading.value = true;
        errors.value = [];
        const data = await $fetch('/api/auth/checkOtp', {
            method: 'POST',
            body: { otp: otp.value }
        })

        toast.success("با موفقیت وارد شدید");
        authUser.value = data;
         emit('showCheckOtpForm')
         navigateTo('/')
    } catch (error) {
         errors.value = Object.values(error?.data).flat();
    } finally {
        loading.value = false;
    }

}
</script>