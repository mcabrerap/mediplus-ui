<template>
  <header>
    <nav class="navbar is-info">
      <div class="navbar-brand">
        <RouterLink to="/" class="navbar-item title">Mediplus</RouterLink>
      </div>
    </nav>
  </header>
  <div class="mt-6 mx-6">
    <div class="tabs is-toggle is-fullwidth is-large">
      <ul>
        <li :class="{ 'is-active': $route.path === '/' }">
          <RouterLink to="/">Appointment</RouterLink>
        </li>
        <li :class="{ 'is-active': $route.path === '/doctor' }">
          <RouterLink to="/doctor">Doctor</RouterLink>
        </li>
        <li :class="{ 'is-active': $route.path === '/patient' }">
          <RouterLink to="/patient">Patient</RouterLink>
        </li>
      </ul>
    </div>
  </div>
  <RouterView />

</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
const $route = useRoute()

</script>

<style scoped>

</style>
