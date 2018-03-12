<template>
  <div class="users">
    This file will list all the posts.
  </div>
</template>

<script>
import creService from '@/services/creService'
export default {
  name: 'users',
  data () {
    return {
      users: []
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      const response = await creService.fetchPosts()
      this.users = response.data
    }
  }
}
</script>
