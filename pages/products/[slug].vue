<template>
    <section class="single_page_section layout_padding">
        <div v-if="product !== null" class="container">
            <div class="row">
                <div class="col-md-10 offset-md-1">
                    <div class="row gy-5">
                        <div class="col-sm-12 col-lg-6">
                            <h3 class="fw-bold mt-5 mb-4">{{ product.data.name }}</h3>
                            <h5 v-if="product.data.is_sale" class="mb-3">
                                <del>{{ numberformat(product.data.price) }}</del>
                                {{ numberformat(product.data.sale_price) }}
                                تومان
                                <div class="text-danger fs-6">
                                    {{ salePercent(product.data.price, product.data.sale_price) }}% تخفیف
                                </div>
                            </h5>
                            <h5 v-else>
                                {{ numberformat(product.data.price) }}
                                تومان
                            </h5>

                            <p class="mb-5">{{ product.data.description }}</p>
                            <button @click="addToCart(product.data)" class="btn">افزودن به سبد خرید</button>
                            <div class="input-counter ms-4">
                                <span class="plus-btn" @click="qty < product.data.quantity && qty++">
                                    +
                                </span>
                                <div class="input-number">{{ qty }}</div>
                                <span class="minus-btn" @click="qty > 1 && qty--">
                                    -
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-6">
                            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                        class="active"></button>

                                    <button v-for="(image, index) in product.data.images" :key="index" type="button"
                                        data-bs-target="#carouselExampleIndicators"
                                        :data-bs-slide-to="`${index + 1}`"></button>
                                </div>

                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img class="d-block w-100" src="/images/preloader.png" width="464" height="309"
                                            v-img="product.data.primary_image" />
                                    </div>

                                    <div v-for="(image, index) in product.data.images" :key="index" class="carousel-item">
                                        <img class="d-block w-100" src="/images/preloader.png" width="464" height="309"
                                            v-img="image.image" />
                                    </div>
                                </div>

                                <button class="carousel-control-prev" type="button"
                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">قبلی</span>
                                </button>
                                <button class="carousel-control-next" type="button"
                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">بعدی</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <hr>
    <section class="food_section my-5">
        <div class="container">
            <div class="row gx-3">
                <div class="col-sm-6 col-lg-3" v-for="product in randomProduct.data" :key="product.id">
                    <ProductCard :product="product" />
                </div>

            </div>
        </div>
    </section>
</template>

<script setup>
import { useCartStore } from "../../store/cart";
const route = useRoute();
const { public: { apiBase } } = useRuntimeConfig();
const { data: product } = await useFetch(`${apiBase}/products/${route.params.slug}`);
const { data: randomProduct } = await useFetch(`${apiBase}/random-products?count=8`);
const cart = useCartStore();
const qty = ref(1)
function addToCart(product,) {
    cart.remove(product.id);
    cart.addToCart(product, qty.value);

}
</script>