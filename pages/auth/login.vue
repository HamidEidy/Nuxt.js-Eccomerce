<template>
    <section class="auth_section book_section">
        <div class="container">
            <div class="row mt-5">
                <div class="col-md-4 offset-md-4">
                    <div class="card">
                        <AuthCheckOtp v-if="showotpform" />
                      <AuthLogin v-else @show-check-otp-form="showotpform = true"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
definePageMeta({
    middleware : 'guest'
})
const showotpform = ref(false)



</script>