<template>
    <ProfileAddressCreate :provinces="data.provinces" :cities="data.cities" />
    <hr />
    <div v-for="address in data.addresses" :key="address.id">
        <ProfileAddressEdit :address="address" :provinces="data.provinces" :cities="data.cities" />
        <hr />
    </div>
</template>

<script setup>

const { data, refresh } = await useFetch('/api/profile/addresses', {
    headers: useRequestHeaders(['cookie'])
})
provide('refreshGetAddress', refresh)


</script>