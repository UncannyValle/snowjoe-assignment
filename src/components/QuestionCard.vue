<template>
  <div
    class="card"
    v-for="(card, index) in cards"
    :key="card.id"
    :class="checkWrong(index)"
  >
    <h3 class="question">{{ card.id }}. {{ card.question }}</h3>
    <div class="options">
      <div class="answer" :class="wrongAnswer('a', index)">
        <input type="radio" value="a" v-model="guesses[index]" />
        <label for="a">{{ card.options[0] }}</label>
      </div>
      <div class="answer" :class="wrongAnswer('b', index)">
        <input type="radio" value="b" v-model="guesses[index]" />
        <label for="b">{{ card.options[1] }}</label>
      </div>
      <div class="answer" :class="wrongAnswer('c', index)">
        <input type="radio" value="c" v-model="guesses[index]" />
        <label for="c">{{ card.options[2] }}</label>
      </div>
      <div class="answer" :class="wrongAnswer('d', index)">
        <input type="radio" value="d" v-model="guesses[index]" />
        <label for="d">{{ card.options[3] }}</label>
      </div>
    </div>
  </div>

  <button type="submit" @click="handleClick">Submit</button>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    cards: Array,
  },
  setup(props) {
    const answers = props.cards.map((card) => card.answer);
    const guesses = ref([]);
    const checked = ref([]);

    const checkWrong = (index) => {
      if (checked.value[index] === "right") {
        return "right";
      } else if (checked.value[index] === "wrong") {
        return "wrong";
      }
    };
    const wrongAnswer = (value, index) => {
      if (checked.value[index] === "wrong" && value === answers[index]) {
        return "right-answer";
      }
    };

    const isCorrect = () => {
      checked.value = answers.map((value, index) => {
        if (guesses.value[index] === undefined) {
          return "empty";
        } else if (value === guesses.value[index]) {
          return "right";
        } else return "wrong";
      });
    };
    const handleClick = () => isCorrect();
    return {
      guesses,
      isCorrect,
      answers,
      handleClick,
      checkWrong,
      wrongAnswer,
    };
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
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
}
.wrong {
  border: red 2px solid;
}
.right {
  border: green 2px solid;
  border-radius: 2px solid;
}
.right-answer {
  background-color: rgb(48, 194, 48);
  border: 3px solid rgb(0, 107, 0);
  color: #ffffff;
}
</style>
