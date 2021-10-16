<template>
  <section>
    <h1>{{pageTitle}}</h1>
 <SearchJokes v-on:search-text="searchText"/>
    <ul>
      <li v-for="joke of jokes" :key="joke.id">
        <a href="#" @click.prevent="openJoke(joke)">{{joke.joke}}</a>
      </li>
    </ul>
  </section>
</template>

<script>
import SearchJokes from "../../components/SearchJokes";

export default {
    components:{
        SearchJokes
    },
  async fetch({store}) {
    if (store.getters['jokes/jokes'].length === 0) {
      await store.dispatch('jokes/fetch')
    }
  },
  data: () => ({
    pageTitle: 'Jokes page'
  }),
  computed: {
    jokes() {
      return this.$store.getters['jokes/jokes']
    }
  },
  methods: {
    openJoke(joke) {
      this.$router.push('/jokes/' + joke.id)
    },
    async searchText(text) {
      const config = {
        headers: {
          Accept: "application/json"
        }
      };

      try {
        const res = await this.$axios.$get(
          `https://icanhazdadjoke.com/search?term=${text}`,
          config
        );
        console.log(res.results)
        this.$store.commit('jokes/setJokes', res.results)
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>