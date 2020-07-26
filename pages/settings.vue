<template>
  <div class="container">
    <a-button class="back-button" type="link" @click="goBack">
      <a-icon type="arrow-left" /> Back
    </a-button>
    <h2>Settings</h2>
    <p>Include ending forward slash <code>/</code></p>
    <a-input v-model="urlValue" placeholder="Url" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    urlValue: {
      get() {
        return this.baseUrl
      },
      set(value) {
        this.setUrl(value)
      },
    },
    ...mapState('settings', ['baseUrl']),
  },
  methods: {
    ...mapMutations({
      setUrl: 'settings/setUrl',
    }),
    goBack() {
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 30px auto;
  padding: 0 10px 0 10px;
}
.back-button {
  margin: 10px 0;
}
</style>
