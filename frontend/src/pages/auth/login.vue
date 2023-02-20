<script lang="ts" setup>

import {useUserSession} from '../../stores/userSession'
import {useRoute, useRouter} from "vue-router";
import {useApi} from "../../composable/useApi";
import { useNotification } from "@kyvg/vue3-notification";

const notification = useNotification()
const router = useRouter()
const route = useRoute()

const userSession = useUserSession()
const redirect = route.query.redirect as string

const isLoading = ref(false)

const values = reactive({
  email: ref(''),
  password: ref(''),
})
const api = useApi()
const onLogin = async () => {
  if (!isLoading.value) {
    isLoading.value = true
    try {
      await api.post('login', values).then((response) => {
        userSession.setUser(response.data.user)
        userSession.setToken(response.data.access_token)
      })

      if (redirect) {
        router.push(redirect)
      } else {
        router.push('/')
      }

      notification.notify({ type: "success",
        title: `Добро пожаловать, ${userSession.user!.name}`,
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
  <h2 class="text-center mt-3">Авторизация</h2>
  <div class="mt-5 row justify-content-md-center">
    <form  class="col-8 mt-2" @submit.prevent="onLogin">

      <div class="form-outline mb-4">
        <input type="email" id="email" required v-model="values.email" placeholder="Email" name="email" class="form-control"/>
      </div>

      <div class="form-outline mb-4">
        <input type="password" id="password" required v-model="values.password" placeholder="Пароль" name="password" min="3" class="form-control"/>
      </div>


      <!-- Submit button -->
      <button type="submit" class="btn btn-primary btn-block mb-4">Вход</button>

      <!-- Register buttons -->
      <div class="text-center">
        <p>Нет аккаунта? <router-link to="/auth/register">Регистрация</router-link></p>
      </div>
    </form>

  </div>
</template>
