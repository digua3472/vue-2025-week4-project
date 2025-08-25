<template>
    <div id="app" class="container py-4">
        <div class="row">
            <!-- 商品列表區 -->
            <AdvancedProductList 
                :products="products"
                :cart="cart"
                @update:cart="updateCart"
            />
            <!-- 購物車區 -->
            <AdvancedCart 
                :cart="cart"
                @update:cart="updateCart"
                @delete-cart-item="deleteCartItem"

            />
            
        </div>
        <!-- 通知元件 -->
         <AdvancedToasts 
            @remove-toast="removeToast"
         />
    </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import { data } from '@/data/data.js';
import AdvancedProductList from '@/components/AdvancedProductList.vue';
import AdvancedCart from '@/components/AdvancedCart.vue';
import AdvancedToasts from '@/components/AdvancedToasts.vue';
// 載入資料
const products = ref(data);
// 購物車
const cart = ref([]);

// 子元件傳入事件，父層更新cart內容
const updateCart = (newCart) => {
    cart.value = newCart;
}

// 子元件傳入事件，父層刪除cart品項
const deleteCartItem = (id) => {
    cart.value = cart.value.filter((cartItem) => (cartItem.id !== id));
    // toast通知
    // showToast('商品已移除', 'danger');
};

// toast通知功能
const toasts = ref([]);
let idCounter = 0;

const showToast = (message, type = 'success') => {
    const id = ++idCounter;
    toasts.value.push({
        id,
        message,
        type,
    });
    setTimeout(() => {
        removeToast(id);
    }, 2000);
};

const removeToast = (id) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
};

provide('toasts', toasts);
provide('showToast', showToast);
</script>

<style>
    body {
    background: #f2f2f2f2;
    }

    .card-img-top {
    height: 150px;
    object-fit: cover;
    }
</style>