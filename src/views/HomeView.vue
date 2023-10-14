<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <h1>Hola Mundo</h1>

    <button @click="goToHomeAdmin" class="btn btn-primary">Primary</button>
    <button @click="goToHomeAdmin" class="btn btn-secondary">Secondary</button>
    <button @click="goToHomeAdmin" class="btn btn-success">Success</button>
  </div>
</template>

<script>

export default {
  methods: {
    goToHomeAdmin(){
      this.$router.push({name: 'homeadmin'})
    }
  }
}

</script>
