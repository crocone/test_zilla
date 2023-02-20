<script setup lang="ts">

import {useUserSession} from "./stores/userSession";

const userSession = useUserSession()
</script>
<template>
  <RouterView v-slot="{ Component }">
    <div class="container">
      <component :is="Component" />
    </div>
    <notifications />
    <DialogsWrapper />
    <Vloader v-show="userSession.loading"/>
  </RouterView>
</template>
