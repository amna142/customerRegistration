<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      :src='getImgUrl()'
    >
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  methods: {
    getImgUrl () {
      var images = require.context('../assets/', false, /\.png$/)
      return images('./' + 'dynasoftLogo' + '.png')
    }
  }
}
</script>
