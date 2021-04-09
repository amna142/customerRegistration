<template>
<div id="app">
<vue-particles
        color="#fb8c00"
        :particleOpacity="0.7"
        :particlesNumber="100"
        shapeType="circle"
        :particleSize="4"
        linesColor="#448aff"
        :linesWidth="2"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="6"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
</vue-particles>
<div class="centered-text">
    <div class="q-pa-md row my-card2">

    <q-card class="my-card">
    <q-card-section>
  <div class="q-pa-md" style="max-width: 400px">
    <h5><b style="color: orange">Registration Form </b></h5>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-input
        filled
        v-model="formData.first_name"
        label="Your Name *"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
        filled
        hint="Email"
        v-model="formData.email"
        label="Email *"
        type="email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your email']"
      />
<q-input
        filled
        v-model="formData.password"
        label="Password *"
        type="password"
        hint="Password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your Password']"
      />
      <q-input
        filled
        v-model="formData.confirmPassword"
        label="Confirm Password *"
        hint="Confirm Password"
        type="password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your Password']"
      />
<br>

     <p style="text-align: right; color: orange">Alreay have an Account? <router-link :to="{ name: 'login'}" style="color: blue">Login</router-link></p>
      <div>
        <q-btn label="Submit" type="submit" color="orange"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
      </q-card-section>
    </q-card>
</div>
</div>
  </div>
</template>
<script>
import axios from 'axios'
import VueParticles from 'vue-particles'
import Vue from 'vue'
Vue.use(VueParticles)
export default {
  data () {
    return {
      formData: {
        first_name: null,
        email: null,
        password: null,
        confirmPassword: null
      }
    }
  },
  methods: {
    onSubmit () {
      const headers = {
        'Content-Type': 'application/json'
      }
      // check domain first from settings table
      // split email address and find domain
      var domain = this.formData.email.split('@')[1]
      console.log(domain)
      var params = {
        domain: domain
      }
      axios.post('http://localhost:3000/setting', params, headers).then((res) => {
        console.log('response', res)
        if (res.data.statusCode === 200) {
          console.log('access', res.data.access)
          var access = res.data.access
          if (access) {
            this.registerEmployee(headers)
          } else {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Please Request to Admin'
            })
          }
        } else {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Please Request to Admin'
          })
        }
      }).catch((error) => {
        console.log('error', error)
        // error action
      })
    },
    registerEmployee: function (headers) {
      if (this.formData.password === this.formData.confirmPassword) {
        console.log('this.formData', this.formData)
        axios.post('http://localhost:3000/register', this.formData, headers).then((res) => {
          console.log('response', res)
          if (res.data.auth) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('data', this.formData.email + ',' + this.formData.first_name)
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Submitted'
            })
            this.$router.push({ name: 'login' })
          } else {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Fill the Form First'
            })
          }
        }).catch((error) => {
          console.log('error', error)
          // error action
        })
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Password and Confirm Password not match'
        })
      }
    },

    onReset () {
      this.formData.name = null
      this.formData.email = null
      this.formData.password = null
    }
  }
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 600px
  margin: 0 auto
  padding-top: 1%
  padding-left: 5%
</style>
<style lang="sass" scoped>
.my-card2
  padding-top: 3.5%
  padding-left: 3%
.centered-text
  position: absolute
  top: 0%
  width: 100%
#particles-js
  height: 100vh
</style>
