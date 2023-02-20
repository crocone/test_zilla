<script setup lang="ts">
import moment from "moment";
import {Payment, STATUS_TEXT} from "../stores/Payment";


const props = defineProps({
  payments: {required: true, type: Array<Payment>}
})
const emit = defineEmits(['close'])
const computedPayments = computed(() => {
  return props.payments.map((payment) => {
    // @ts-ignore
    payment.status = STATUS_TEXT[payment.status];
    payment.created_at = moment(payment.created_at).format("Y-MM-D HH:mm:ss");
    return payment
  })
})
</script>
<template>
  <div class="modal fade show d-block" id="dialogModal" tabindex="-1" aria-labelledby="dialogModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Список платежей</h5>
          <button type="button" class="btn-close" @click="emit('close')" data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="table-responsive">
            <table class="table no-wrap user-table mb-0">
              <thead>
              <tr>
                <th scope="col" class="border-0 text-uppercase font-medium pl-4">#</th>
                <th scope="col" class="border-0 text-uppercase font-medium">Сумма</th>
                <th scope="col" class="border-0 text-uppercase font-medium">Дата</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="payment in computedPayments" :key="payment.id">
                <td class="pl-4">{{ payment.id }}</td>
                <td>
                  <h5>{{ payment.amount }}</h5>
                </td>
                <td>
                  <h5>{{ payment.created_at }}</h5>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">

          <button class="btn btn-secondary" @click="emit('close')">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>