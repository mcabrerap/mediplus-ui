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
        <label class="label">Speciality</label>
        <div class="control">
          <div class="select is-fullwidth">
            <select v-model="speciality">
              <option disabled value="">Select a speciality</option>
              <option v-for="(speciality, index) in specialities" :key="index">
                {{ speciality }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Medical Center</label>
        <div class="control">
          <input class="input" type="text" placeholder="Medical Center" v-model="medicalCenter">
        </div>
      </div>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" placeholder="Email" v-model="email">
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
        <th>Speciality</th>
        <th>Medical Center</th>
        <th>Email</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(doctor, index) in doctors" :key="index">
        <td>{{ doctor.id }}</td>
        <td>{{ doctor.name }}</td>
        <td>{{ doctor.lastname }}</td>
        <td>{{ doctor.speciality }}</td>
        <td>{{ doctor.medical_center }}</td>
        <td>{{ doctor.email }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
import type { Doctor } from "@/models/Doctor";
import http from '@/http/http'
import {ref, onMounted} from "vue";

const name = ref<string>('')
const lastname = ref<string>('')
const specialities = ref<string[]>([])
const speciality = ref<string>('')
const medicalCenter = ref<string>('')
const email = ref<string>('')
const doctors = ref<Doctor[]>([])


const submit = async () => {

  const doctor: Doctor = {
    id: 0,
    name: name.value,
    lastname: lastname.value,
    speciality: speciality.value,
    medical_center: medicalCenter.value,
    email: email.value,
  };

  try {
    await http.post<Doctor>('/doctor', doctor);
    const updatedDoctorsResponse = await http.get<Doctor[]>('/doctor');
    doctors.value = updatedDoctorsResponse.data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  try {
    const specialitiesResponse = await http.get('/specialities');
    const doctorsResponse = await http.get('/doctor');
    specialities.value = specialitiesResponse.data;
    doctors.value = doctorsResponse.data;
  } catch (error) {
    console.log(error);
  }
});
</script>
