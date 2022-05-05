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
    <p
      v-if="checkWrong(index) === 'wrong'"
      class="warning"
      :class="checkWrong(index)"
    >
      Wrong
    </p>
    <p
      v-if="checkWrong(index) === 'right'"
      class="warning"
      :class="checkWrong(index)"
    >
      Correct
    </p>
  </div>

  <button class="button" type="submit" @click="handleClick">Submit</button>
  <p v-if="emptyGuesses" class="error-message">
    Answer all questions before submitting. Unanswered questiosn are displayed
    in yellow.
  </p>
</template>

<script>
import { ref } from "vue";
import store from "../store/index";

export default {
  props: {
    cards: Array,
  },
  setup(props) {
    const answers = props.cards.map((card) => card.answer);
    const guesses = ref(Array(answers.length).fill("empty"));
    const checked = ref([]);
    const score = ref();
    const emptyGuesses = ref(false);

    const checkWrong = (index) => {
      if (checked.value[index] === "empty") {
        return "empty";
      }
      if (checked.value[index] === "right") {
        return "right";
      }
      if (checked.value[index] === "wrong") {
        return "wrong";
      }
    };
    const wrongAnswer = (value, index) => {
      if (checked.value[index] === "wrong" && value === answers[index]) {
        return "right-answer";
      }
    };

    const isCorrect = () => {
      if (guesses.value.includes("empty")) {
        emptyGuesses.value = true;
        checked.value = answers.map((answer, index) => {
          return guesses.value[index] === "empty" ? "empty" : null;
        });
      } else {
        score.value = 0;
        emptyGuesses.value = false;
        checked.value = answers.map((value, index) => {
          if (guesses.value[index] === undefined) {
            return "empty";
          } else if (value === guesses.value[index]) {
            return "right";
          } else return "wrong";
        });
      }

      checked.value.forEach((x) =>
        x === "right" ? (score.value += 10) : null
      );
    };

    const handleClick = () => {
      isCorrect();
      store.methods.scoreUpdate(score);
      console.log(guesses.value, emptyGuesses.value);
    };
    return {
      guesses,
      emptyGuesses,
      isCorrect,
      answers,
      handleClick,
      checkWrong,
      wrongAnswer,
      score,
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  -webkit-box-shadow: 0px 1px 7px -3px #000000;
  box-shadow: 0px 1px 7px -3px #000000;
  margin-top: 2rem;

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
    display: flex;
    align-items: center;
  }
}
.warning {
  text-align: right;
}
.wrong {
  border: red 2px solid;
  &.warning {
    color: red;
    border: none;
  }
}
.right {
  border: green 2px solid;
  &.warning {
    color: green;
    border: none;
  }
}
.empty {
  border: yellow 2px solid;
}
.right-answer {
  background-color: rgb(48, 194, 48);
  border: 3px solid rgb(0, 107, 0);
  color: #ffffff;
}
.button {
  display: block;
  padding: 0.5rem 1rem;
  margin: 1.5rem auto;
  color: white;
  border: solid black 2px;
  border-radius: 0.25rem;
  background-color: green;
}
.error-message {
  color: red;
  text-align: center;
}
@media (max-width: 768px) {
  .options {
    padding: 0;
    .answer {
      padding: 0.5rem 0;
    }
  }
}
@media (max-width: 512px) {
  .card {
    padding: 1.5rem;
    margin-top: 1rem;
  }
}
</style>
