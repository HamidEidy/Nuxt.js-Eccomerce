import { defineStore } from 'pinia';
import { useToast } from "vue-toastification";
const toast = useToast();
export const useCartStore = defineStore('cart', {
    state: () => {
        return {
            cart: []
        }
    },
    actions: {
        addToCart(product, count) {
            this.cart.push({
                ...product,
                qty: count
            })
            toast.success('محصول به سبد خرید اضافه شد')
        },
        remove(id) {
            this.cart = this.cart.filter(p => p.id != id);
        },
        increment(id) {
            const item = this.cart.find(p => p.id == id)
            if (item) {
                item.qty++
            }

        },
        clear() {
            this.cart = [];
        },
        decrement(id) {
            const item = this.cart.find(p => p.id == id)
            if (item.quantity > 1) {
                item.qty--
            }
        }
    },
    persist: {
        storage: persistedState.localStorage,
        key: 'shopping-cart'
    },
    getters: {
        count(state) {
            return state.cart.length
        },
        allItems(state) {
            return state.cart
        },
        totalAmount(state) {
            return state.cart.reduce((total, product) => {
                return product.is_sale ? total + (product.sale_price * product.qty) : total + (product.price * product.qty)
            }, 0)
        }
    }
})