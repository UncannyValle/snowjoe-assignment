import { reactive, ref } from "vue";

const state = reactive({
  score: ref(),
});

const methods = {
  scoreUpdate(value) {
    state.score = value;
  },
};

export default { state, methods };
