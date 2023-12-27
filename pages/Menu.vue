<template>
    <section class="food_section layout_padding">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-lg-3">
                    <div>
                        <label class="form-label">جستجو</label>
                        <div class="input-group mb-3">
                            <input @input="checksearchbox" type="text" v-model="search" class="form-control" placeholder="نام محصول ..."
                                aria-label="Recipient's username" aria-describedby="basic-addon2">
                            <button @click="search !== '' && changepage({ search: search })" class="input-group-text" id="basic-addon2">
                                <i class="bi bi-search"></i>
                            </button>

                        </div>
                    </div>
                    <hr>
                    <div class="filter-list">
                        <div class="form-label">
                            دسته بندی
                        </div>
                        <ul>
                            <li :class="{ 'filter-list-active': route.query.hasOwnProperty('category') && route.query.category == category.id }"
                                @click="changepage({ category: category.id })" v-for="category in categories.data"
                                :key="category.id" class="my-2 cursor-pointer">{{ category.name
                                }}
                            </li>
                        </ul>
                    </div>
                    <hr>
                    <div>
                        <label class="form-label">مرتب سازی</label>
                        <div class="form-check my-2">
                            <input :checked="route.query.hasOwnProperty('sortBy') && route.query.sortBy == 'max'"
                                @click="changepage({ sortBy: 'max' })" class="form-check-input" type="radio"
                                name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label cursor-pointer" for="flexRadioDefault1">
                                بیشترین قیمت
                            </label>
                        </div>
                        <div class="form-check my-2">
                            <input @click="changepage({ sortBy: 'min' })" class="form-check-input" type="radio"
                                name="flexRadioDefault" id="flexRadioDefault2"
                                :checked="route.query.hasOwnProperty('sortBy') && route.query.sortBy == 'min'">
                            <label class="form-check-label cursor-pointer" for="flexRadioDefault2">
                              کمترین قیمت
                            </label>
                        </div>
                        <div class="form-check my-2">
                            <input :checked="route.query.hasOwnProperty('sortBy') && route.query.sortBy == 'bestseller'"
                                @click="changepage({ sortBy: 'bestseller' })" class="form-check-input" type="radio"
                                name="flexRadioDefault" id="flexRadioDefault3">
                            <label class="form-check-label cursor-pointer" for="flexRadioDefault3">
                                پرفروش ترین
                            </label>
                        </div>
                        <div class="form-check my-2">
                            <input :checked="route.query.hasOwnProperty('sortBy') && route.query.sortBy == 'sale'"
                                @click="changepage({ sortBy: 'sale' })" class="form-check-input" type="radio"
                                name="flexRadioDefault" id="flexRadioDefault4">
                            <label class="form-check-label cursor-pointer" for="flexRadioDefault4">
                                با تخفیف
                            </label>
                        </div>
                    </div>
                </div>




                <div v-if="pending" class="d-flex justify-content-center align-items-center h-100 col-sm-12 col-lg-9">
                    <div class="spinner-border"></div>
                </div>
                <div class="col-sm-12 col-lg-9" v-else>
                    <div v-if="data.data.products.length == 0"
                        class="d-flex justify-content-center align-items-center h-100">
                        <h5>محصولی یافت نشد !</h5>
                    </div>
                    <div v-else>

                        <div class="row gx-3">
                            <div class="col-sm-6 col-lg-4" v-for="product in data.data.products" :key="product.id">
                                <productCard :product="product" />
                            </div>

                        </div>
                    </div>
                    <nav class="d-flex justify-content-center mt-5">
                        <ul class="pagination">
                            <li class="page-item" :class="{ active: link.active }"
                                v-for="link in data.data.meta.links.slice(1, -1)" :key="link.id"><button
                                    @click="changepage({ page: link.label })" class="page-link" href="#">{{ link.label
                                    }}</button></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </section>
</template>


<script setup>
const router = useRouter();
const route = useRoute();
const search = ref('');
const query = ref({});
const { public: { apiBase } } = useRuntimeConfig();

const { data: categories } = await useFetch(`${apiBase}/categories`);
query.value = route.query;
const { data, refresh, pending } = await useFetch(() => `${apiBase}/menu`, {
    query: query
});

watch(
    () => {
        if (Object.keys(route.query).length == 0) {
            query.value = {};
            
        }
    }

);




function changepage(param) {
    query.value = { ...route.query, ...param }
    if (!param.hasOwnProperty('page')) {
        delete query.value.page
    }
    router.push({
        path: '/menu',
        query: query.value
    })
}
function checksearchbox(val){
    if (val.target.value == '') {
        if (query.value.hasOwnProperty('search')) {
            delete query.value.search
        }
        router.push({
        path: '/menu',
        query: query.value
    })
    }
  
}
</script>