<template>
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
</template>

<script setup>
import { inject } from 'vue';

const toasts = inject('toasts');
const emit = defineEmits(['removeToast']);

const removeToast = (id) => {
    emit('removeToast', id);
};
</script>

<style>

</style>