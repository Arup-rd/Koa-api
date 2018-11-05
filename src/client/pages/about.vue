<template>
  <div>
    <ul>
      <li v-for="item in users" :key="item.id">
        {{ item.content }}
      </li>
    </ul>  
  </div>
</template>

<script>
  export default {
    async asyncData({ app }) {
      const { body: users } = await app.$axios.$get('/users');
      return { users };
    }
  };
</script>

<style scoped>

</style>