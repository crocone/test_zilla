<script lang="ts" setup>


import {useApi} from "../composable/useApi";
import ModalDialog from '../components/ModalDialog.vue'
import {createConfirmDialog} from 'vuejs-confirm-dialog'
import {useNotification} from "@kyvg/vue3-notification";
import {User} from "../stores/userSession";
import {Payment} from "../stores/Payment";


const notification = useNotification()


const editUser = ref<User>()
const api = useApi()
const users = ref<Array<User>>([])
const payments = ref<Array<Payment>>([])
const userList = () => {
  api.get('/api/users').then((response) => {
    users.value = response.data.users
  })
}
userList()

const onEdit = (user: User) => {
  editUser.value = {...user}
}
const onSave = () => {
  api.post('/api/users', editUser.value).then(() => {
    notification.notify({type: 'success', title: 'Пользователь обновлен'})
    userList()
  }).catch((response) => {
    notification.notify({type: 'error', title: response.data.error})
  })
  //@ts-ignore
  editUser.value = {}
}

const deleteUser = (user: User) => {
  api.delete(`/api/users/${user.id}`).then(() => {
    notification.notify({type: 'success', title: 'Пользователь удален'})
    userList()
  }).catch((response) => {
    notification.notify({type: 'error', title: response.data.error})
  })

}
const onDelete = async (user: User) => {
  //@ts-ignore
  const dialog = createConfirmDialog(ModalDialog, {
    title: `Подтвердите удаление пользователя ${user.name}`,
    confirmText: 'Удалить',
    cancelText: 'Отменить'
  })
  const {isCanceled} = await dialog.reveal()

  if (isCanceled) return

  deleteUser(user)
}

const getPayments = async (user: User) => {
  api.get(`/api/users/${user.id}/payments`).then((response) => {
    payments.value = response.data.payments
  }).catch((response) => {
    notification.notify({type: 'error', title: response.data.error})
  })
}

const closePayments = () => {
  payments.value = []
}
</script>
<template>
  <div class="row">
    <h5 class="card-title text-uppercase mt-3 text-center">Пользователи</h5>
    <div class="col-md-12 mt-5">
      <div class="card">
        <div class="table-responsive">
          <table class="table no-wrap user-table mb-0">
            <thead>
            <tr>
              <th scope="col" class="border-0 text-uppercase font-medium pl-4">#</th>
              <th scope="col" class="border-0 text-uppercase font-medium">Имя</th>
              <th scope="col" class="border-0 text-uppercase font-medium">Телефон</th>
              <th scope="col" class="border-0 text-uppercase font-medium">Email</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="pl-4">{{ user.id }}</td>
              <td>
                <input type="text" v-if="editUser?.id !== user.id" disabled class="form-control" v-model="user.name"/>
                <input type="text" v-else class="form-control" v-model="editUser.name"/>
              </td>
              <td>
                <input type="text" v-if="editUser?.id !== user.id" disabled class="form-control" v-model="user.phone"/>
                <input type="text" v-else class="form-control" v-model="editUser.phone"/>
              </td>
              <td>
                <input type="email" v-if="editUser?.id !== user.id" disabled class="form-control" v-model="user.email"/>
                <input type="email" v-else class="form-control" v-model="editUser.email"/>
              </td>
              <td>
                <button type="button" @click="getPayments(user)" class="btn btn-primary btn-sm ml-5">
                  <font-awesome-icon icon="money-bill"/>
                </button>
                <button v-if="editUser?.id !== user.id" type="button" @click="onEdit(user)"
                        class="btn btn-info btn-sm ml-2">
                  <font-awesome-icon icon="edit"/>
                </button>
                <button v-else type="button" @click="onSave()" class="btn btn-info btn-sm ml-2">
                  <font-awesome-icon icon="save"/>
                </button>
                <button type="button" @click="onDelete(user)" class="btn btn-danger btn-sm ml-5">
                  <font-awesome-icon icon="trash"/>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <PaymentList v-if="payments.length > 0" @close="closePayments()" :payments="payments"/>
  </div>
</template>