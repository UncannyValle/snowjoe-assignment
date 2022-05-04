<template>
  <div class="card"  v-for="card in cards" :key="card.id">
    <h3 class="question">{{ card.id }}. {{ card.question }}</h3>
    <div class="options">

      <div class="answer" :class="checkWrong(1)">
        <input type="radio" value="a" v-model="guesses[card.id]" />
        <label for="a">{{ card.options[0] }}</label>
      </div>
      <div class="answer" :class="isRight">
        <input type="radio" value="b" v-model="guesses[card.id]" />
        <label for="b">{{ card.options[1] }}</label>
      </div>
      <div class="answer" :class="isRight">
        <input type="radio" value="c" v-model="guesses[card.id]" />
        <label for="c">{{ card.options[2] }}</label>
      </div>
      <div class="answer" :class="isRight">
        <input type="radio" value="d" v-model="guesses[card.id]" />
        <label for="d">{{ card.options[3] }}</label>
      </div>
    </div>
  </div>

  <button type="submit" @click="handleClick">Submit</button>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    cards: Array,
  },
  setup(props) {
    const answers = props.cards.map((x) => x.answer);
    const guesses = ref([]);

    const isCorrect = computed(() => {
      return answers.map((value, index) => {
        if (guesses.value[index + 1] === undefined) {
          return "empty";
        } else if (value === guesses.value[index + 1]) {
          return true;
        } else return false;
      });
    });
    const handleClick = () => console.log(answers, guesses.value, isCorrect.value);


    return { guesses, isCorrect, answers, handleClick };
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  -webkit-box-shadow: 0px 1px 7px -3px #000000;
  box-shadow: 0px 1px 7px -3px #000000;
  margin-bottom: 2rem;

  label {
    padding: 0 1rem;
  }
}
.question {
  font-weight: 400;
  padding-bottom: 1rem;
}

.options {
  padding: 0 1rem;
  .answer {
    padding-bottom: 0.5rem;
  }
}
.right {
  border: red;
}
</style>
