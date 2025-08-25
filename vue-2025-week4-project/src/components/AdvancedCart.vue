<template>
    <div class="col-md-4">
        <h2 class="mb-3">購物車</h2>
        <div
         v-if="props.cart.length === 0"
         class="alert alert-secondary"
         role="alert"
        >
            請選擇商品
        </div>
        <ul v-else class="list-group mb-3">
            <li
                v-for="product in props.cart"
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
</template>

<script setup>
import { computed, inject } from 'vue';

const props = defineProps({
    cart: Array,
});

const emit = defineEmits([
    'update:cart',
    'deleteCartItem'
]);

const showToast = inject('showToast');

// 總計
const sum = computed(() => {
    return props.cart.reduce((pre, cur) => {
        return pre + cur.price * cur.quantity;
    }, 0);
});

// 刪除購物車品項
const deleteCartItem = (id) => {
    const index = props.cart.findIndex((cartItem) => cartItem.id === id);
    if(index !== -1) {
        props.cart.splice(index, 1);
        emit('update:cart', props.cart);
        emit('deleteCartItem', id);
    };
    // toast通知
    showToast('商品已移除', 'danger');
};
</script>

<style>

</style>