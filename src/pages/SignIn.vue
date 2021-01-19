<template>
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
<p style="text-align: right"><router-link :to="{ name: 'SignUp'}">Register Yourself!</router-link> &nbsp; &nbsp; &nbsp;  <router-link :to="{ name: 'SignUp'}">Forgot Password?</router-link>
</p>
      <div>
        <q-btn label="Submit" @click="showLoading" type="submit" color="orange"/>
      </div>
    </q-form>

  </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import axios from 'axios'
import {

  // optional!, for example below
  // with custom spinner
  QSpinnerFacebook
} from 'quasar'
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
    showLoading () {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'purple',
        messageColor: 'black',
        message: 'loading'
      })
      setTimeout(() => {
        // this.$q.loading.hide()
        this.timer = 0
      }, 3000)
    },
    onSubmit () {
      console.log('this.formData', this.formData)
      const headers = {
        'Content-Type': 'application/json'
      }
      axios.post('http://localhost:3000/login', this.formData, headers).then((res) => {
        console.log('response', res)
        if (res.data.auth) {
          localStorage.setItem('token', res.data.token)
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Login Successfully'
          })
        }
        this.$router.push({ name: 'home' })
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
  max-width: 700px
  margin: 0 auto
  padding-top: 3%
  padding-left: 7%
</style>
<style lang="sass" scoped>
.my-card2
  padding-top: 5%
  padding-left: 5%
</style>
