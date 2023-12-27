<template>
    <hr />
    <section class="food_section layout_padding ">
        <div class="container">
            <div class="heading_container heading_center">
                <h2>
                    منو محصولات
                </h2>
            </div>
            <div>
                <Tabs nav-item-active-class="active" nav-class="filters_menu "
                    :options="{ useUrlFragment: false, disableScrollBehavior: true }">
                    <Tab v-for="(tabList, index) in products.data.tabList" :key="index" :name="tabList">
                        <div class="filters_content">
                            <div class="row grid">
                                <div v-for="product in products.data.tabPanel[index].slice(0, 3)" :key="product.id"
                                    class="col-sm-6 col-lg-4">
                                    <ProductCard :product="product" />
                                </div>
                            </div>
                        </div>
                    </Tab>


                </Tabs>
            </div>
            <div class="btn-box">
                <nuxt-link to="/Menu" class="btn">
                    مشاهده منو
                </nuxt-link>
            </div>
        </div>
    </section>

<hr />
    <section class="food_section  layout_padding ">
        <div class="heading_container heading_center">
            <h2 class="mt-2">
                پیشنهاد ما به شما
            </h2>
        </div>
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
import { Tabs, Tab } from 'vue3-tabs-component';
const { public: { apiBase } } = useRuntimeConfig();
const { data: products } = await useFetch(`${apiBase}/products/products-tabs`);
const { data: randomProduct } = await useFetch(`${apiBase}/random-products?count=8`);

</script>