import {createRouter, createWebHistory} from 'vue-router'
import AppointmentView from '../views/AppointmentView.vue'
import DoctorView from '../views/DoctorView.vue'
import PatientView from '../views/PatientView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'appointment',
            component: AppointmentView
        },
        {
            name: 'doctor',
            path: '/doctor',
            component: DoctorView
        },
        {
            name: 'patient',
            path: '/patient',
            component: PatientView
        }
    ]
})

export default router
