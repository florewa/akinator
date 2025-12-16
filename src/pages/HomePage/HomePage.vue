<script setup lang="ts">
import { onMounted } from "vue";

import GameSession from "@/components/GameSession.vue";
import LearningForm from "@/components/LearningForm.vue";
import MainMenu from "@/components/MainMenu.vue";
import SearchInfo from "@/components/SearchInfo.vue";
import TreeItem from "@/components/TreeItem.vue";
import VButton from "@/components/ui/VButton/VButton.vue";
import VModal from "@/components/ui/VModal/VModal.vue";
import { useExpertSystemStore } from "@/stores/expertSystem";

const store = useExpertSystemStore();

onMounted(() => {
  store.initialize();
});
</script>

<template>
  <div class="app-layout">
    <div class="app-card">
      <header class="app-card__header">
        <h1>🐶 Dog Expert</h1>
        <p class="app-card__subtitle">Я угадаю твою собаку</p>
      </header>

      <main class="app-card__content">
        <MainMenu
          v-if="store.mode === 'menu'"
          @start-game="store.setMode('game')"
          @view-all="store.setMode('view')"
          @search="store.setMode('search')"
          @save="store.saveDB"
          @reset="store.resetDB"
        />

        <GameSession
          v-if="store.mode === 'game'"
          :database="store.database"
          @game-over="store.setMode('menu')"
          @needs-learning="store.startLearning"
          @back="store.setMode('menu')"
        />

        <LearningForm
          v-if="store.mode === 'learning' && store.learningTargetNode"
          :wrong-node="store.learningTargetNode"
          @finish-learning="store.applyLearning"
          @cancel="store.setMode('menu')"
        />

        <div v-if="store.mode === 'view'" class="view-panel">
          <div class="view-panel__scroll-area">
            <ul class="tree-root">
              <TreeItem :node="store.database" />
            </ul>
          </div>
          <VButton variant="secondary" @click="store.setMode('menu')">
            Назад
          </VButton>
        </div>

        <SearchInfo
          v-if="store.mode === 'search'"
          :database="store.database"
          @back="store.setMode('menu')"
        />
      </main>
    </div>

    <VModal
      :is-open="store.notification.show"
      :title="store.notification.title"
      @close="store.closeNotify"
    >
      <p>{{ store.notification.message }}</p>
      <template #footer>
        <VButton variant="primary" @click="store.closeNotify">Ок</VButton>
      </template>
    </VModal>
  </div>
</template>

<style scoped lang="scss">
.app-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.app-card {
  background: var(--just-white);
  width: 100%;
  max-width: 500px;
  border-radius: 32px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__header {
    background: var(--just-white);
    padding: 40px 30px 20px;
    text-align: center;

    h1 {
      margin: 0;
      font-size: 2rem;
      color: var(--text-main);
    }
  }

  &__subtitle {
    margin: 8px 0 0;
    color: #888;
    font-size: 1rem;
  }

  &__content {
    padding: 30px;
  }
}

.view-panel {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__scroll-area {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #eee;
    border-radius: 16px;
    padding: 20px;
  }
}

.tree-root {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
