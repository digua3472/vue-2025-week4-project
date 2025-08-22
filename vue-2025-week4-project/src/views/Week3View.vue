<template>
    <div id="root">
        <div class="container mt-5">
            <div class="row">
                <!-- 品項清單 -->
                 <ProductList
                    :data="data"
                    :add-cart="addCart"
                 />
                <!-- <div class="col-md-4">
                    <div class="list-group">
                        <a href="#" class="list-group-item list-group-item-action" v-for="item in data" :key="item.id" @click="addCart(item)">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">{{ item.name }}</h5>
                                <small>${{ item.price }}</small>
                            </div>
                            <p class="mb-1">{{ item.description }}</p>
                        </a>
                    </div>
                </div> -->
                <!-- 購物車清單 -->
                 <CartCard 
                    :cart="cart"
                    :order="order"
                    v-model:remark="remark"
                    @update:cart="(newCart) => (cart.value = newCart)"
                    @create-order="createOrder"
                    @reset-cart="resetCart"
                 />
                <!-- <div class="col-md-8">
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
                            <tr v-for="item in cart" :key="item.id">
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
                    <div v-if="cart.length === 0" class="alert alert-primary text-center" role="alert">
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
                        v-model="remark"
                        ></textarea>
                        <div class="text-end">
                            <button class="btn btn-primary" @click.prevent="createOder">送出</button>
                        </div>
                    </div>
                </div> -->
            </div>
            <hr />
            <!-- 訂單明細 -->
             <OrderCard 
                :order="order"
             />
            <!-- <div class="row justify-content-center">
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
            </div> -->
        </div>
    </div>

</template>

<script setup>
import { computed, ref } from 'vue';
import ProductList from '@/components/ProductList.vue';
import CartCard from '@/components/CartCard.vue';
import OrderCard from '@/components/OrderCard.vue';

const data = [
    {
        id: 1,
        name: "珍珠奶茶",
        description: "香濃奶茶搭配QQ珍珠",
        price: 50
    },
    {
        id: 2,
        name: "冬瓜檸檬",
        description: "清新冬瓜配上新鮮檸檬",
        price: 45
    },
    {
        id: 3,
        name: "翡翠檸檬",
        description: "綠茶與檸檬的完美結合",
        price: 55
    },
    {
        id: 4,
        name: "四季春茶",
        description: "香醇四季春茶，回甘無比",
        price: 45
    },
    {
        id: 5,
        name: "阿薩姆奶茶",
        description: "阿薩姆紅茶搭配香醇鮮奶",
        price: 50
    },
    {
        id: 6,
        name: "檸檬冰茶",
        description: "檸檬與冰茶的清新組合",
        price: 45
    },
    {
        id: 7,
        name: "芒果綠茶",
        description: "芒果與綠茶的獨特風味",
        price: 55
    },
    {
        id: 8,
        name: "抹茶拿鐵",
        description: "抹茶與鮮奶的絕配",
        price: 60
    }
]

// 新增購物車品項
const cart = ref([]);
const addCart = (item) => {
    cart.value.push({
        id: new Date().getTime(),
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: 1,
    })    
}
// // 刪除品項
// const deleteCartItem = (id) => {
//     cart.value.forEach((item, index) => {
//         if(item.id === id) {
//             cart.value.splice(index, 1);
//         }
//     });
// }

// // 更新數量
// const updateCart = (item) => {
//   cart.value.forEach((cartItem) => {
//     if (cartItem.id === item.id) {
//       cartItem.quantity = parseInt(item.quantity);
//     }
//   });
// };
// // 小計
// const itemSubtotal = (item) => {
//     return item.price * item.quantity;
// }
// // 總計
// // const total = computed(() => {
// //     return cart.value.reduce((prev, curr) => {
// //         return prev + curr.price * curr.quantity;
// //     }, 0);
// // })
// const total = computed(() => {
//     let sum = 0;
//     cart.value.forEach((item) => {
//         sum += item.price * item.quantity;
//     });
//     return sum;
// })

// 備註
const remark = ref('');
// 送出訂單
const order = ref({});
// const createOder = () => {
//     order.value = {
//         id: new Date().getTime(),
//         cart: cart.value,
//         remark: remark.value,
//         total: total.value
//     }
//     cart.value = [];
//     remark.value = '';
// }
const createOrder = (newOrder) => {
    order.value = newOrder;
}

const resetCart = () => {
    cart.value = [];
}

</script>

<style>
</style>