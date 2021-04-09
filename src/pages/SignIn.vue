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
    <h5 style="color: orange"><b>SignIn Form </b></h5>
    <q-form
      @submit="onSubmit"
    >
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
<p style="text-align: right"><router-link :to="{ name: 'SignUp'}" style="color: blue">Register Yourself!</router-link> &nbsp; &nbsp; &nbsp;  <router-link :to="{ name: 'SignUp'}" style="color: blue">Forgot Password?</router-link>
</p>
      <div>
        <q-btn label="Submit" type="submit" color="orange"/>
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
        email: null,
        password: null
      }
    }
  },
  beforeDestroy () {
    if (this.timer !== 0) {
      clearTimeout(this.timer)
      this.$q.loading.hide()
    }
  },
  methods: {
    onSubmit () {
      console.log('this.formData', this.formData)
      const headers = {
        'Content-Type': 'application/json'
      }
      axios.post('http://localhost:3000/login', this.formData, headers).then((res) => {
        console.log('response', res)
        if (res.data.auth) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('data', this.formData.email)
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Login Successfully'
          })
          this.$router.push({ name: 'home' })
        }
        // success action
      }).catch((error) => {
        console.log('error', error)
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Invalid Credentials'
        })
        // error action
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 600px
  margin: 0 auto
  padding-top: 0%
  padding-left: 5%
</style>
<style lang="sass" scoped>
.my-card2
  padding-top: 9%
  padding-left: 2%
.centered-text
  position: absolute
  top: 0%
  width: 100%
#particles-js
  height: 100vh
</style>
