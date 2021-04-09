<template>
<div id="q-app">
  <div class="q-pa-md">
  <q-layout view="hHh Lpr lff" container style="height: 680px" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-orange" >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <b>PAYROLL || DYANSOFTCLOUD</b>
        </q-toolbar-title>

<div class="q-pa-md">
    <q-btn-dropdown color="blue" :label="name" dropdown-icon="change_history">
      <q-list>
        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label  @click="deleteJwt" type="submit">Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
:width="300"
          :breakpoint="500"
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-blue"
        >
          Main Menu
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
class="text-blue"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  </div>
  </div>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import axios from 'axios'
const linksData = [
  {
    title: 'Docs',
    caption: 'payroll.docs',
    icon: 'school',
    link: '/docs'
  },
  {
    title: 'Attendance',
    caption: 'attendance.dynasoftcloud',
    icon: 'chat',
    link: '/attendance'
  },
  {
    title: 'Employees',
    caption: 'employees.dynasoftcloud',
    icon: 'record_voice_over',
    link: '/employees'
  }
]
export default {
  name: 'MainLayout',
  components: { EssentialLink },
  created () {
    console.log('hello amna')
    this.name = localStorage.getItem('data')
    console.log('name', this.name)
    // make a call to verify tokens
    const token = localStorage.getItem('token')
    console.log('token', token)
    axios.get('http://localhost:3000/home', {
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log('response', res)
      if (res.data.auth === false) {
        this.$router.push({ name: 'login' })
      }
      // success action
    }).catch((error) => {
      console.log('error', error)
      // error action
    })
  },
  methods: {
    deleteJwt () {
      console.log('hi')
      var token = localStorage.getItem('token')
      console.log('token', token)
      if (token) {
        localStorage.removeItem('token')
        localStorage.removeItem('data')
        this.$router.push({ name: 'login' })
      }
    },
    onItemClick () {
      // console.log('Clicked on an Item')
    }
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      name: null
    }
  }
}
</script>
