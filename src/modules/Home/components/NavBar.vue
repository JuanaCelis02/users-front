<template>
  <div class="navbar">
    <div class="d-flex justify-content-between align-items-center w-100">
      <div class="d-flex align-items-center">
        <el-avatar :size="50" :src="userData.imageUrl || circleUrl" />
        <span class="ms-3">{{ userData.name }} {{ userData.lastName }}</span>
      </div>
      <div>
        <el-button type="danger" @click="logOutMethod" :icon="Close" circle />
      </div>
    </div>
  </div>
</template>

<script>
import {Close} from '@element-plus/icons-vue'
import {mapState, mapMutations} from 'vuex'

export default {
  data() {
    return {
      Close,
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },

  computed: {
    ...mapState('login', ['userData'])
  },

  methods: {
    ...mapMutations('login', ["logOut"]),
    logOutMethod() {
      this.logOut()
      sessionStorage.removeItem('token');
      this.$router.push('/login')
    }
  }

}
</script>

<style>

</style>