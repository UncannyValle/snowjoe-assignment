<template>
  <form @submit="console.log(picked)">
    <div class="card" v-for="card in cards" :key="card.id">
      <h3 class="question">{{ card.id }}. {{ card.question }}</h3>
      <div class="options">
        <div class="answer">
          <input
            type="radio"
            value="A"
            :name="`choices-${card.id}`"
            v-model="pickedA"
          />
          <label for="A">{{ card.options[0] }}</label>
        </div>
        <div class="answer">
          <input
            type="radio"
            value="B"
            :name="`choices-${card.id}`"
            v-model="picked"
          />
          <label for="B">{{ card.options[1] }}</label>
        </div>
        <div class="answer">
          <input
            type="radio"
            value="C"
            :name="`choices-${card.id}`"
            v-model="picked"
          />
          <label for="C">{{ card.options[2] }}</label>
        </div>
        <div class="answer">
          <input
            type="radio"
            value="D"
            :name="`choices-${card.id}`"
            v-model="picked"
          />
          <label for="D">{{ card.options[3] }}</label>
        </div>
      </div>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  props: {
    cards: Array,
  },
  data() {
    return { picked: "", pickedA: "a" };
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
</style>
