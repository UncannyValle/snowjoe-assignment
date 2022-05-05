<template>
  <div class="results">
    <h2 class="results-title">Results</h2>
    <p class="total">You got {{ score }} / {{ total }} questions correct</p>
    <p v-if="percentage" class="percentage">{{ percentage }} %</p>
    <p v-else class="percentage">0 %</p>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
export default {
  props: {
    score: Number,
    length: Number,
  },
  setup(props) {
    const total = ref(props.length * 10);
    const percentage = computed(() =>
      Math.floor((props.score / props.length) * 10)
    );

    return { total, percentage };
  },
};
</script>

<style lang="scss" scoped>
.results {
  text-align: center;
  margin: 1rem auto;
  color: rgb(98, 96, 96);
}
.results-title {
  text-decoration: underline;
  font-size: 1.5rem;
  padding: 1rem 0;
  font-weight: 400;
}
.total {
  font-size: 1.5rem;
}
.percentage {
  color: red;
  font-size: 1.75rem;
  padding-top: 0.5rem;
  font-weight: 700;
}
</style>
