<template>
  <div class="form-style mt-6">
    <form action="" class="mx-6" @submit.prevent>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Name" v-model="name">
        </div>
      </div>
      <div class="field">
        <label class="label">Lastname</label>
        <div class="control">
          <input class="input" type="text" placeholder="Lastname" v-model="lastname">
        </div>
      </div>
      <div class="field">
        <label class="label">Identification Number</label>
        <div class="control">
          <input class="input" type="number" placeholder="Identification Number" v-model="identification">
        </div>
      </div>
      <div class="field">
        <label class="label">Age</label>
        <div class="control">
          <input class="input" type="number" placeholder="Age" v-model="age">
        </div>
      </div>
      <div class="field">
        <label class="label">Phone</label>
        <div class="control">
          <input class="input" type="tel" placeholder="Phone" v-model="phone">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary is-fullwidth" @click="submit">Submit</button>
        </div>
      </div>
    </form>
    <table class="table is-fullwidth mt-6">
      <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Lastname</th>
        <th>Identification Number</th>
        <th>Age</th>
        <th>Phone</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(patient, index) in patients" :key="index">
        <td>{{ patient.id }}</td>
        <td>{{ patient.name }}</td>
        <td>{{ patient.lastname }}</td>
        <td>{{ patient.identification }}</td>
        <td>{{ patient.age }}</td>
        <td>{{ patient.phone }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
import type {Patient} from "@/models/Patient";
import http from '@/http/http'
import {ref, onMounted} from "vue";

const name = ref<string>('')
const lastname = ref<string>('')
const identification = ref<number>(0)
const age = ref<number>(0)
const phone = ref<string>('')
const patients = ref<Patient[]>([])

const submit = async () => {

  const patient: Patient = {
    name: name.value,
    lastname: lastname.value,
    identification: identification.value,
    age: age.value,
    phone: phone.value
  }

  try {
    await http.post<Patient>('/patient', patient);
    const updatedPatientsResponse = await http.get<Patient[]>('/patient');
    patients.value = updatedPatientsResponse.data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  try {
    const response = await http.get<Patient[]>('/patient');
    patients.value = response.data;
  } catch (error) {
    console.log(error);
  }
})


</script>
