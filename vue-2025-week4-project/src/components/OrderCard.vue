<template>
<div class="row justify-content-center">
    <div class="col-8">
        <div v-if="!order.id" class="alert alert-dark text-center" role="alert">
            尚未建立訂單
        </div>
        <div  v-else class="card">
            <div class="card-body">
                <div class="card-title">
                    <h5>訂單</h5>
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">品項</th>
                            <th scope="col">數量</th>
                            <th scope="col">小計</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in order.cart" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ itemSubtotal(item) }}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="text-end">備註: <span>{{ order.remark }}</span></div>
                    <div class="text-end">
                        <h5>總計: <span>${{ order.total }}</span></h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['order']);

// 小計
const itemSubtotal = (item) => {
    return item.price * item.quantity;
}
</script>

<style>

</style>