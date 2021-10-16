<template>
  <section>
    <nuxt-link to="/jokes">Back To Jokes</nuxt-link>
    <h2>{{ joke.joke }}</h2>
    <hr>
    <small>Joke ID: {{ $route.params.id }}</small>
  </section>
</template>

<script>
export default {
//   validate({params}) {
//     return /^\d+$/.test(params.id)
//   },
  async asyncData({$axios, params}) {
    const joke = await $axios.$get('https://icanhazdadjoke.com/j/' + params.id,
                                        {
                                            headers: {
                                              Accept: 'application/json'
                                            }
                                          })
    return {joke}
  }
}
</script>

