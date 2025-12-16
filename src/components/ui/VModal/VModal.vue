<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  title?: string;
}>();

const emit = defineEmits<{ (e: "close"): void }>();
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="emit('close')">
        <div class="modal-card">
          <header class="modal-card__header">
            <h3 v-if="title">{{ title }}</h3>
            <button class="modal-card__close" @click="emit('close')">✕</button>
          </header>

          <div class="modal-card__body">
            <slot />
          </div>

          <footer v-if="$slots.footer" class="modal-card__footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-card {
  background: var(--just-white);
  width: 100%;
  max-width: 400px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: slide-up 0.3s ease-out;

  &__header {
    padding: 20px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;

    h3 {
      margin: 0;
      font-size: 1.25rem;
      color: var(--text-main);
    }
  }

  &__close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #999;
    &:hover {
      color: var(--danger);
    }
  }

  &__body {
    padding: 24px;
    font-size: 1.1rem;
    color: #555;
    line-height: 1.5;
  }

  &__footer {
    padding: 16px 24px;
    background: #f9f9f9;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
