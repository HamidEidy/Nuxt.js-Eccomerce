<template>
    <ClientOnly>
        <section v-if="cart.count > 0" class="single_page_section layout_padding">
            <div class="container">
                <div class="row">
                    <div class="col-md-10 offset-md-1">
                        <div class="row gy-5">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table align-middle">
                                        <thead>
                                            <tr>
                                                <th>محصول</th>
                                                <th>نام</th>
                                                <th>قیمت</th>
                                                <th>تعداد</th>
                                                <th>قیمت کل</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in cartItem" :key="item.id">
                                                <th>
                                                    <img src="/images/preloader.png" width="100" height="60" alt="product-image"
                                                        v-img="item.primary_image">
                                                </th>
                                                <td class="fw-bold">{{ item.name }}</td>
                                                <td>
                                                    <div>
                                                        <span v-if="item.is_sale"><del>{{ numberformat(item.price) }}</del> <br> {{ numberformat(item.sale_price) }} </span>
                                                        <span v-else>{{ numberformat(item.price) }}</span>
                                                        <span class="ms-1">تومان</span>
                                                        <div v-if="item.is_sale" class="text-danger">
                                                            {{ salePercent(item.price, item.sale_price) }} ٪تخفیف
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="input-counter">
                                                        <span class="plus-btn" @click="item.qty < item.quantity && cart.increment(item.id)">
                                                            +
                                                        </span>
                                                        <div class="input-number">{{ item.qty }}</div>
                                                        <span class="minus-btn" @click="item.qty > 1 && cart.decrement(item.id)">
                                                            -
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span v-if="item.is_sale">{{ numberformat(item.sale_price * item.qty) }}</span>
                                                    <span v-else>{{ numberformat(item.price * item.qty) }}</span>
                                                    <span class="ms-1">تومان</span>
                                                </td>
                                                <td>
                                                    <i @click="removeFromCart(item.id)"
                                                     class="bi bi-x text-danger fw-bold fs-4 cursor-pointer"></i>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <button class="btn mb-4" @click="cart.clear()">پاک کردن سبد خرید</button>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-12 col-md-6">
                               <CartCoupon :coupon="coupon" />
                            </div>
                            <div class="col-12 col-md-6 d-flex justify-content-end align-items-baseline">
                                <CartAddress @set-address-id="(id) => addressId = id" />
                            </div>
                        </div>
                        <div class="row justify-content-center mt-5">
                            <div class="col-12 col-md-6">
                                <div class="card">
                                    <div class="card-body p-4">
                                        <h5 class="card-title fw-bold">مجموع سبد خرید</h5>
                                        <ul class="list-group mt-4">
                                            <li class="list-group-item d-flex justify-content-between">
                                                <div>مجموع قیمت :</div>
                                                <div>
                                                    {{ numberformat(totalAmount) }} تومان
                                                </div>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                <div>تخفیف :
                                                    <span class="text-danger ms-1">{{ coupon.percent }}%</span>
                                                </div>
                                                <div class="text-danger">
                                                    {{ numberformat((totalAmount * coupon.percent) / 100) }} تومان
                                                </div>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between">
                                                <div>قیمت پرداختی :</div>
                                                <div>
                                                    {{ numberformat(totalAmount - ((totalAmount * coupon.percent) /
                                                    100)) }} تومان
                                                </div>
                                            </li>
                                        </ul>
                                       <cartPayment :coupon="coupon" :addressId="addressId" :cartItem="cartItem"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="cart-empty" v-else>
            <div class="text-center">
                <div>
                    <i class="bi bi-basket-fill" style="font-size: 80px;"></i>
                </div>
                <h4 class="text-bold mt-3">سبد خرید شما خالی است !</h4>
                <nuxt-link to="/Menu" class="btn mt-3">مشاهده محصولات</nuxt-link>
            </div>
        </section>
        <template #fallback>
            <div class="cart-empty">
                <div class="text-center">
                    <div class="cart-loading">
                        <div class="spinner-border spinner-border-sm  ms-2 cart-spiner"></div>
                    </div>
                </div>
            </div>
        </template>
    </ClientOnly>
</template>




<script setup>
import { useToast } from 'vue-toastification';
import { useCartStore } from '/store/cart';
definePageMeta({
    middleware: 'auth'
});
const toast = useToast();
const cart = useCartStore();
const cartItem = computed(() => cart.allItems);
const totalAmount = computed(() => cart.totalAmount);
const addressId = ref(null);
const coupon = reactive({
    code: '',
    percent: 0
});

function removeFromCart(id) {
    cart.remove(id)
    toast.warning("محصول از سبد خرید حذف شد")
};

</script>