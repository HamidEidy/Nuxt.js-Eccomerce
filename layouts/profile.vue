<template>
    <section class="profile_section layout_padding">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-lg-3">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <nuxt-link to="/profile">اطلاعات کاربر</nuxt-link>
                        </li>
                        <li class="list-group-item">
                            <nuxt-link to="/profile/addresses">آدرس ها</nuxt-link> 
                        </li>
                        <li class="list-group-item">
                            <nuxt-link to="/profile/orders">سفارشات</nuxt-link> 
                        </li>
                        <li class="list-group-item">
                            <nuxt-link to="/profile/transactions">تراکنش ها</nuxt-link> 
                        </li>
                        <li class="list-group-item">
                            <a @click="logout" href="#">خروج</a>
                        </li>
                    </ul>
                </div>
                <div class="col-sm-12 col-lg-9">
               <slot />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useToast } from 'vue-toastification';
const toast = useToast()
definePageMeta({
    middleware : 'auth'
})
 
const {authUser} = useAuth();

async function logout(){
    await useFetch('/api/auth/logout', {
        headers : useRequestHeaders(['cookie']),
        method : 'POST'
    })
    authUser.value = null;
    toast.warning("با موفقیت خارج شدید");
    return navigateTo('/')
}
</script>