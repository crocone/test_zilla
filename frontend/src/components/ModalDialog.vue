<script setup lang="ts">
const emit = defineEmits(['confirm', 'cancel', ])
const props = defineProps({
  title: {type: String, required: true},
  confirmText: { type: String, required: false, default: 'Подтвердить' },
  cancelText: { type: String, required: false, default: 'Отменить' },
})
</script>

<template>
  <div class="modal fade show d-block" id="dialogModal" tabindex="-1" aria-labelledby="dialogModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
          <button type="button" class="btn-close"  @click="emit('cancel')" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="emit('confirm')">{{ confirmText }}</button>
          <button class="btn btn-secondary" @click="emit('cancel')">{{cancelText}}</button>
        </div>
      </div>
    </div>
  </div>
</template>