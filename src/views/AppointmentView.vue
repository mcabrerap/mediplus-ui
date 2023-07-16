<template>
  <div class="form-style mt-6">
    <form action="" class="mx-6" @submit.prevent>
      <div class="field">
        <label class="label">Patient</label>
        <div class="control">
          <div class="select is-fullwidth">
            <select v-model="patient">
              <option disabled value="">Select a patient</option>
              <option v-for="(patient, index) in patients" :key="index" :value="patient">
                {{ patient.name }} {{ patient.lastname }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Speciality</label>
        <div class="control">
          <div class="select is-fullwidth">
            <select v-model="speciality">
              <option disabled value="">Select a speciality</option>
              <option v-for="(speciality, index) in specialities" :key="index" :value="speciality">
                {{ speciality }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Doctor</label>
        <div class="control">
          <div class="select is-fullwidth">
            <select v-model="doctor" :disabled="filteredDoctors.length === 0">
              <option disabled value="">Select a doctor</option>
              <option v-for="(doctor, index) in filteredDoctors" :key="index" :value="doctor">
                {{ doctor.name }} {{ doctor.lastname }}
              </option>
            </select>
          </div>
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
        <th>Patient Identification</th>
        <th>Patient Name</th>
        <th>Patient Lastname</th>
        <th>Speciality</th>
        <th>Doctor Name</th>
        <th>Doctor Lastname</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(appointment, index) in appointmentList" :key="index">
        <td>{{ appointment.patient_identification }}</td>
        <td>{{ appointment.patient_name }}</td>
        <td>{{ appointment.patient_lastname }}</td>
        <td>{{ appointment.speciality }}</td>
        <td>{{ appointment.doctor_name }}</td>
        <td>{{ appointment.doctor_lastname }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
import type {Appointment} from "@/models/Appointment";
import type {Doctor} from "@/models/Doctor";
import type {Patient} from "@/models/Patient";
import type {AppointmentList} from "@/models/AppointmentList";
import http from '@/http/http'
import {ref, onMounted, computed} from "vue";

const speciality = ref<string>('')
const specialities = ref<string[]>([])
const doctor = ref<Doctor>()
const patient = ref<Patient>()
const doctors = ref<Doctor[]>([]);
const patients = ref<Patient[]>([]);
const appointments = ref<Appointment[]>([]);
const appointmentList = ref<AppointmentList[]>([]);

const filteredDoctors = computed(() => {
  return doctors.value.filter(doctor => doctor.speciality === speciality.value);
});

const submit = async () => {

  if (!doctor.value || !patient.value || !speciality.value) {
    return;
  }

  if (!doctor.value.id || !patient.value.id) {
    return;
  }

  try {
    const appointment: Appointment = {
      doctor_id: doctor.value.id,
      patient_id: patient.value.id,
      speciality: speciality.value,
      patient_identification: patient.value.identification,
    }
    await http.post('/appointment', appointment);
    const updatedAppointmentResponse = await http.get('/appointment');
    appointments.value = updatedAppointmentResponse.data;
    updateAppointmentList();
  } catch (error) {
    console.log(error);
  }
}

const updateAppointmentList = () => {
  appointmentList.value = [];
  for (const appointment of appointments.value) {
    const doctor = doctors.value.find(doctor => doctor.id === appointment.doctor_id);
    const patient = patients.value.find(patient => patient.id === appointment.patient_id);

    if (!doctor || !patient) {
      continue;
    }

    appointmentList.value.push({
      patient_identification: appointment.patient_identification,
      patient_name: patient.name,
      patient_lastname: patient.lastname,
      speciality: appointment.speciality,
      doctor_name: doctor.name,
      doctor_lastname: doctor.lastname,
    });
  }
}

onMounted(async () => {
  try {

    const specialitiesResponse = await http.get('/specialities');
    const doctorResponse = await http.get('/doctor');
    const patientResponse = await http.get('/patient');
    const appointmentResponse = await http.get('/appointment');

    specialities.value = specialitiesResponse.data;
    doctors.value = doctorResponse.data;
    patients.value = patientResponse.data;
    appointments.value = appointmentResponse.data;

    updateAppointmentList();

  } catch (error) {
    console.log(error);
  }
});


</script>
