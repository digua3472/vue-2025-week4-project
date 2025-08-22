<template>
    <div class="col-md-4">
        <div class="list-group">
            <a 
            href="#" class="list-group-item list-group-item-action" 
            v-for="item in data" 
            :key="item.id" 
            @click="addCart(item)"
            >
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{ item.name }}</h5>
                    <small>${{ item.price }}</small>
                </div>
                <p class="mb-1">{{ item.description }}</p>
            </a>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['data', 'addCart'])

</script>

<style>

</style>