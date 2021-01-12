<template>
  <div class="q-pa-md row my-card2">
    <q-card class="my-card">
    <q-card-section>
  <div class="q-pa-md" style="max-width: 400px">
    <h5><b>Registration Form </b></h5>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-input
        filled
        v-model="formData.name"
        label="Your name *"
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
      <q-toggle v-model="formData.accept" label="I agree" />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      formData: {
        name: null,
        email: null,
        password: null,
        confirmPassword: null,
        accept: false
      }
    }
  },
  methods: {
    onSubmit () {
      if (this.formData.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the accept the terms & conditions first'
        })
      } else {
        const headers = {
          'Content-Type': 'application/json'
        }
        var passwordHash = require('password-hash')
        var hashedPassword = passwordHash.generate(this.formData.password)
        var hashedPwdStatus = passwordHash.verify(this.formData.confirmPassword, hashedPassword)
        console.log('hashedPwdStatus', hashedPwdStatus)
        if (hashedPwdStatus) {
          this.formData.password = hashedPassword
          console.log('this.formData', this.formData)
          axios.post('http://localhost:3000/customers', this.formData, headers).then((res) => {
            console.log('response', JSON.stringify(res))
            if (res) {
              this.$q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Submitted'
              })
            }
            // success action
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
      }
    },

    onReset () {
      this.formData.name = null
      this.formData.email = null
      this.formData.password = null
      this.formData.accept = false
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
