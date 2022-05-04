<template>
  <div class="results">
    <h2 class="results-title">Results</h2>
    <p>You got {{ score }} out of {{ total }}</p>
    <p v-if="percentage">{{ percentage }} %</p>
    <p v-else>0 %</p>
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
}
.results-title {
  text-decoration: underline;
}
</style>
