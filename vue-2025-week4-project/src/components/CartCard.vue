<template>
    <div class="col-md-8">
        <table class="table">
            <thead>
                <tr>
                <th scope="col" width="50">操作</th>
                <th scope="col">品項</th>
                <th scope="col">描述</th>
                <th scope="col" width="90">數量</th>
                <th scope="col">單價</th>
                <th scope="col">小計</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in props.cart" :key="item.id">
                    <td>
                        <button 
                            type="button" 
                            class="btn btn-sm"
                            @click="deleteCartItem(item.id)"
                        >
                        x
                        </button>
                    </td>
                    <td>{{ item.name }}</td>
                    <td><small>{{ item.description }}</small></td>
                    <td>
                        <select
                            class="form-select"
                            v-model="item.quantity"
                            @change="updateCart(item)"
                        >
                            <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                        </select>
                    </td>
                    <td>{{ item.price }}</td>
                    <td>{{ itemSubtotal(item) }}</td>
                </tr>
            </tbody>
        </table>
        <div v-if="props.cart.length === 0" class="alert alert-primary text-center" role="alert">
            請選擇商品
        </div>
        <div v-else>
            <div class="text-end mb-3">
                <h5>總計: <span>${{ total }}</span></h5>
            </div>
            <textarea
            class="form-control mb-3"
            rows="3"
            placeholder="備註"
            v-model="cardRemark"
            ></textarea>
            <div class="text-end">
                <button class="btn btn-primary" @click.prevent="createOrder">送出</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, defineEmits, defineProps, ref, watch } from 'vue';

// const props = defineProps(['cart', 'total', 'remark']);
const props = defineProps({
    cart: Array,
    remark: String,
    order: Object
});

const emit = defineEmits([
    'update:cart',
    'update:remark',
    'deleteItem',
    'createOrder',
    'resetCart',
]);

// 刪除品項
const deleteCartItem = (id) => {
    props.cart.forEach((item, index) => {
        if(item.id === id) {
            props.cart.splice(index, 1);
            emit('update:cart', props.cart);
            emit('deleteItem', id)
        }
    });
}

// 更新數量
const updateCart = (item) => {
  props.cart.forEach((cartItem) => {
    if (cartItem.id === item.id) {
      cartItem.quantity = parseInt(item.quantity);
      emit('update:cart', props.cart);
    }
  });
};

// 備註
// 欄位更新後，傳到父元件Week3View.vue
const cardRemark = ref(props.remark);
watch(cardRemark, (newValue) => {
    emit('update:remark', newValue);
})

// 小計
const itemSubtotal = (item) => {
    return item.price * item.quantity;
}

// 總計
// const total = computed(() => {
//     return cart.value.reduce((prev, curr) => {
//         return prev + curr.price * curr.quantity;
//     }, 0);
// })
const total = computed(() => {
    let sum = 0;
    props.cart.forEach((item) => {
        sum += item.price * item.quantity;
    });
    return sum;
})

// 送出訂單
const createOrder = () => {
    const newOrder = {
        id: new Date().getTime(),
        cart: [...props.cart],
        remark: cardRemark.value,
        total: total.value
    };
    props.cart.splice(0);
    cardRemark.value = '';
    emit('createOrder', newOrder);
    emit('resetCart');
}

</script>

<style>

</style>