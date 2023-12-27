<template>
    <div @click="deleteAddress" class="btn-red">
        حذف
        <span v-if="loading" class="spinner-border spinner-border-sm ms-2"></span>
    </div>
</template>

<script setup>
import { useToast } from "vue-toastification";

const props = defineProps(['addressId'])
const refreshGetAddress = inject('refreshGetAddress');
const loading = ref(false);
const toast = useToast();

async function deleteAddress() {
    try {
        loading.value = true;

        await $fetch('/api/profile/addresses/delete', {
            method: 'POST',
            body: { address_id: props.addressId }
        });

        refreshGetAddress()
        toast.warning("حذف آدرس باموفقیت انجام شد");
    } catch (error) {
        console.log(Object.values(error?.data.data.message).flat());
    } finally {
        loading.value = false;
    }
}
</script>

<style scoped>
div{
    line-height: 0 !important;
    display: flex;
    align-items: center;
}
</style>