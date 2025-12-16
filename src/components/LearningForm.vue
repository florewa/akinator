<script setup lang="ts">
import { reactive, ref } from "vue";

import VButton from "@/components/ui/VButton/VButton.vue";
import type { KnowledgeNode } from "@/types/types.ts";

defineProps<{ wrongNode: KnowledgeNode }>();
const emit = defineEmits<{
  (
    e: "finish-learning",
    data: { breed: string; question: string; isYes: boolean },
  ): void;
  (e: "cancel"): void;
}>();

const form = reactive({
  correctBreed: "",
  distinguishingQuestion: "",
  answerForNewBreed: "yes",
});

const errorMsg = ref("");

const submit = () => {
  if (!form.correctBreed || !form.distinguishingQuestion) {
    errorMsg.value = "Пожалуйста, заполните все поля";
    return;
  }
  emit("finish-learning", {
    breed: form.correctBreed,
    question: form.distinguishingQuestion,
    isYes: form.answerForNewBreed === "yes",
  });
};
</script>

<template>
  <div class="learning-form">
    <h2 class="learning-form__title">🎓 Учимся</h2>
    <p class="learning-form__desc">
      Я думал это <b>{{ wrongNode.text }}</b
      >, но ошибся.
    </p>

    <div class="field">
      <label>Кого вы загадали?</label>
      <input v-model="form.correctBreed" placeholder="Например: Хаски" />
    </div>

    <div class="field">
      <label
        >Вопрос, чтобы отличить от <b>{{ wrongNode.text }}</b
        >:</label
      >
      <input
        v-model="form.distinguishingQuestion"
        placeholder="Например: У него голубые глаза?"
      />
    </div>

    <div class="field">
      <label
        >Для <b>{{ form.correctBreed || "новой" }}</b> ответ будет:</label
      >
      <div class="radio-switcher">
        <button
          :class="{ active: form.answerForNewBreed === 'yes' }"
          @click="form.answerForNewBreed = 'yes'"
        >
          Да
        </button>
        <button
          :class="{ active: form.answerForNewBreed === 'no' }"
          @click="form.answerForNewBreed = 'no'"
        >
          Нет
        </button>
      </div>
    </div>

    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

    <div class="actions">
      <VButton variant="primary" @click="submit">Запомнить</VButton>
      <VButton variant="secondary" @click="emit('cancel')">Отмена</VButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.learning-form {
  text-align: left;
  &__title {
    margin: 0 0 10px;
    color: var(--accent);
  }
  &__desc {
    margin-bottom: 20px;
    color: #666;
  }
}

.field {
  margin-bottom: 20px;
  label {
    display: block;
    font-weight: 700;
    margin-bottom: 8px;
    font-size: 0.9rem;
  }
  input {
    width: 100%;
    padding: 14px;
    border: 2px solid #eee;
    border-radius: 12px;
    font-size: 1rem;
    outline: none;
    transition: border 0.2s;
    box-sizing: border-box;
    &:focus {
      border-color: var(--accent);
    }
  }
}

.radio-switcher {
  display: flex;
  background: #f0f0f0;
  padding: 4px;
  border-radius: 12px;
  button {
    flex: 1;
    border: none;
    background: transparent;
    padding: 10px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    color: #888;
    &.active {
      background: var(--just-white);
      color: var(--accent);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
  }
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.error {
  color: var(--danger);
  font-size: 0.9rem;
  margin-bottom: 10px;
}
</style>
