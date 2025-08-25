<template>
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
</template>

<script setup>
import { inject } from 'vue';

const props = defineProps({
    products: Array,
    cart: Array,
    showToast: Function
});

const emit = defineEmits(['update:cart'])

const showToast = inject('showToast');

// 加入購物車

const addCart = (product) => {
    const existing = props.cart.find(cartItem => cartItem.id === product.id);
    if(existing) {
        //id已存在，數量累加
        existing.quantity += 1;
        emit('update:cart', props.cart);
        // toast通知
        showToast(`${product.name} 已更新數量`, 'success');
    } else {
        // id不存在，新增一筆
        props.cart.push({
            ...product,
            quantity: 1,
        });
        emit('update:cart', props.cart);
                
        // toast通知
        showToast(`${product.name} 已加入購物車`, 'success');
    };
};
</script>

<style>

</style>