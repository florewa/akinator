<script setup lang="ts">
import VButton from "@/components/ui/VButton/VButton.vue";

const emit = defineEmits<{
  (e: "start-game"): void;
  (e: "view-all"): void;
  (e: "search"): void;
  (e: "save"): void;
  (e: "reset"): void;
}>();
</script>

<template>
  <div class="menu">
    <VButton variant="primary" icon="🎮" @click="emit('start-game')">
      Начать игру
    </VButton>

    <div class="menu__group">
      <VButton variant="secondary" icon="🌳" @click="emit('view-all')">
        База
      </VButton>
      <VButton variant="secondary" icon="🔍" @click="emit('search')">
        Поиск
      </VButton>
    </div>

    <div class="menu__footer">
      <VButton variant="ghost" @click="emit('save')">Сохранить</VButton>
      <VButton variant="danger" @click="emit('reset')">Сброс</VButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__group {
    display: flex;
    gap: 12px;
  }

  &__footer {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px dashed #eee;
    display: flex;
    gap: 10px;
  }
}
</style>
