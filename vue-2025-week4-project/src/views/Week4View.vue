<template>
    <div id="app" class="container py-4">
        <div class="row">
            <!-- 商品列表區 -->
            <div class="col-md-8">
                <h2 class="mb-3">商品列表</h2>
                <div class="row">
                    <div class="col-md-4 mb-4" v-for="product in products" :key="product.id">
                        <div class="card h-100">
                            <img :src="product.imgUrl" :alt="product.name" class="card-img-top">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">{{ product.name }}</h5>
                                <p class="card-text">{{ product.discription }}</p>
                                <p class="fw-bold text-primary mt-auto">$ {{ product.price }}</p>
                                <button
                                 @click="addCart(product)"
                                 class="btn btn-success w-100 "
                                >
                                加入購物車
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 購物車區 -->
            <div class="col-md-4">
                <h2 class="mb-3">購物車</h2>
                <div v-if="cart.length === 0" class="alert alert-secondary" role="alert">
                   請選擇商品
                </div>
                <ul v-else class="list-group mb-3">
                    <li
                     v-for="product in cart"
                     :key="product.id"
                     class="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <div>
                            <h6 class="my-0">{{ product.name }}</h6>
                            <small class="text-muted">數量：{{ product.quantity }}</small>
                        </div>
                        <div>
                            <span class="text-muted">${{ product.price }}</span>
                            <button
                             @click="deleteCartItem(product.id)"
                             class="btn btn-sm btn-outline-danger ms-2"
                            >
                            移除
                            </button>
                        </div>
                    </li>
                </ul>
                <div class="text-end fw-bold">總金額：{{ sum }}</div>
            </div>
        </div>

        <!-- 通知元件 -->
        <div
         v-if="toasts"
         class="toast-container position-fixed top-0 end-0 p-3"
         style="z-index: 1050"
        >
            <div 
             v-for="toast in toasts"
             :key="toast.id"
             :class="toast.type === 'success' ? 'bg-success' : 'bg-danger'"
             class="toast show align-items-center text-white border-0"
             role="alert"
             aria-live="assertive"
             aria-atomic="true"
            >
                <div class="d-flex">
                    <div class="toast-body">{{ toast.message }}</div>
                    <button
                     @click="removeToast(toast.id)"
                     type="button"
                     class="btn-close btn-close-white me-2 m-auto"
                    ></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { data } from '@/data/data.js';
// 載入資料
const products = ref(data);

// 加入購物車
const cart = ref([]);
const addCart = (product) => {
    const existing = cart.value.find(cartItem => cartItem.id === product.id);
    if(existing) {
        //id已存在，數量累加
        existing.quantity += 1;
        // toast通知
        showToast(`${product.name} 已更新數量`, 'success');
    } else {
        // id不存在，新增一筆
        cart.value.push({
            ...product,
            quantity: 1,
        });
        // toast通知
        showToast(`${product.name} 已加入購物車`, 'success');
    };
};

// 總計
const sum = computed(() => {
    return cart.value.reduce((pre, cur) => {
        return pre + cur.price * cur.quantity;
    }, 0);
});

// 刪除購物車品項
const deleteCartItem = (id) => {
    cart.value = cart.value.filter((cartItem) => (cartItem.id !== id));
    // toast通知
    showToast('商品已移除', 'danger');
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