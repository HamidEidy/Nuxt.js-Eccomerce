<template>
    <div class="sub_page">
        <div class="hero_area">
            <!-- header section strats -->
            <header class="header_section">
                <div class="container">
                    <nav class="navbar navbar-expand-lg custom_nav-container">
                        <a class="navbar-brand" href="/">
                            <span>
                                فست فود
                            </span>
                        </a>

                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mx-auto">
                                <li class="nav-item" :class="{ active: $route.path === '/' }">
                                    <Nuxt-link class="nav-link " to="/">صفحه اصلی</Nuxt-link>
                                </li>
                                <li class="nav-item" :class="{ active: $route.path === '/Menu' }">
                                    <Nuxt-link class="nav-link" to="/Menu">منو</Nuxt-link>
                                </li>
                                <li class="nav-item" :class="{ active: $route.path === '/About-us' }">
                                    <Nuxt-link class="nav-link" to="/About-us">درباره ما</Nuxt-link>
                                </li>
                                <li class="nav-item" :class="{ active: $route.path === '/Contact-us' }">
                                    <Nuxt-link class="nav-link" to="/Contact-us">تماس با ما</Nuxt-link>
                                </li>
                            </ul>
                            <div class="user_option">
                                <nuxt-link to="/cart" class="cart_link position-relative">
                                    <i class="bi bi-cart-fill text-dark fs-5"></i>
                                    <ClientOnly>
                                        <span class="position-absolute top-0 translate-middle badge rounded-pill">
                                            {{ cart.count }}
                                        </span>
                                    </ClientOnly>
                                </nuxt-link>
                                <nuxt-link v-if="authUser" to="/profile"  class="btn">
                                    پروفایل
                                </nuxt-link>
                                <nuxt-link to="/auth/login" v-else  class="btn">
                                    ورود
                                </nuxt-link>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
            <!-- end header section -->
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '~~/store/cart';
const { authUser } = useAuth();
const cart = useCartStore();
</script>

