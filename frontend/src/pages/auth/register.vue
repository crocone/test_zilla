<script lang="ts" setup>

import {useUserSession} from '../../stores/userSession'
import {useRoute, useRouter} from "vue-router";
import {useApi} from "../../composable/useApi";
import { useNotification } from "@kyvg/vue3-notification";

const router = useRouter()
const route = useRoute()
const notification = useNotification()
const userSession = useUserSession()
const redirect = route.query.redirect as string

const isLoading = ref(false)

const values = reactive({
  name: ref(''),
  email: ref(''),
  password: ref(''),
  password_confirmation: ref(''),
})
const api = useApi()
const onLogin = async () => {
  if (!isLoading.value) {
    isLoading.value = true
    try {
      await api.post('register', values)

      router.push('/auth/login')


      notification.notify({ type: "success",
        title: `Вы успешно зарегистрировались, ${values.name}`,
      });
    } catch (err: any) {
      notification.notify({ type: "error",
        title: err.response.data.message,
      });
    } finally {
      isLoading.value = false
    }
  }
}

</script>
<template>
  <h2 class="text-center mt-3">Регистрация</h2>
  <div class="mt-5 row justify-content-md-center">
    <form  class="col-8 mt-2" @submit.prevent="onLogin">

      <div class="form-outline mb-4">
        <input type="text" id="name" required v-model="values.name" placeholder="Имя" name="name" class="form-control"/>
      </div>
      <div class="form-outline mb-4">
        <input type="email" id="email" required v-model="values.email" placeholder="Email" name="email" class="form-control"/>
      </div>
      <div class="form-outline mb-4">
        <input type="password" id="password" required v-model="values.password" placeholder="Пароль" name="password" min="3" class="form-control"/>
      </div>
      <div class="form-outline mb-4">
        <input type="password" id="password_confirmation" required v-model="values.password_confirmation" placeholder="Повторите пароль" name="password_confirmation" min="3" class="form-control"/>
      </div>


      <!-- Submit button -->
      <button type="submit" class="btn btn-primary btn-block mb-4">Регистрация</button>

      <!-- Register buttons -->
      <div class="text-center">
        <p>Уже есть аккаунт? <router-link to="/auth/login">Авторизация</router-link></p>
      </div>
    </form>

  </div>
</template>
