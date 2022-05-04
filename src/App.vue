<template>
  <div id="app">
    <header>
      <h1 class="app-title">Quiz Application</h1>
    </header>
    <main>
      <h1 class="quiz-title">Quiz 1 - HTML / CSS / JS Practice</h1>
      <!-- <div v-if="guesses.length > 0">Results</div> -->
      <QuestionCard :cards="cards" />
    </main>
  </div>
</template>

<script>
import QuestionCard from "./components/QuestionCard.vue";
import questions from "../questions.json";
import { ref } from "@vue/reactivity";

export default {
  name: "App",
  components: { QuestionCard },
  setup() {
    const cards = ref(questions);
    
    
    return { cards };
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html {
  font-size: 16px;
}
main {
  max-width: 1080px;
  margin: 0rem auto;
  padding: 1rem;
}

#app {
  font-family: "montserrat", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.app-title {
  font-size: 1.25rem;
  padding: 1rem 1.5rem;
  background-color: #721121;
  color: #ffffff;
  font-weight: 300;
}
.quiz-title {
  font-weight: 400;
  padding-bottom: 1rem;
}
</style>
