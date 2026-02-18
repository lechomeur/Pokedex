<script setup lang="ts">
import { reactive, ref } from 'vue';
import { z } from 'zod'; // Importando o Zod

// 1. Definindo o Schema de Validação (Regras do Prof. Oak)
const trainerSchema = z.object({
  name: z.string()
    .min(3, "Must be at least 3 characters long")
    .max(20, "Name is too long for a Trainer Card"),
  email: z.string()
    .email("Please provide a valid email address")
});

// Estado reativo do formulário
const trainerData = reactive({
  name: '',
  email: ''
});

// Estados de controle da UI
const isSending = ref(false);
const showSuccess = ref(false);
const errors = ref({ name: '', email: '' });

const resetForm = () => {
  showSuccess.value = false;
  errors.value = { name: '', email: '' }; 
  trainerData.name = '';
  trainerData.email = '';
};

const handleJoinLab = () => {
  errors.value = { name: '', email: '' };
  const result = trainerSchema.safeParse(trainerData);

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as 'name' | 'email';
      errors.value[field] = issue.message;
    });
    return;
  }

  isSending.value = true;
  
  setTimeout(() => {
    // Usar result.data garante que você está usando os dados limpos pelo Zod
    console.log("Data validated and sent:", result.data);
    isSending.value = false;
    showSuccess.value = true;
  }, 1500);
};
</script>

<template>
  <footer class="footer-glass">
    <div class="footer-content">
      <div class="oak-branding">
        <h3>Prof. Oak's Newsletter</h3>
        <p>Receive new research reports and rare Pokémon alerts.</p>
      </div>

      <form v-if="!showSuccess" @submit.prevent="handleJoinLab" class="oak-form">
        <div class="input-wrapper">
          <div class="input-group">
            <input 
              v-model="trainerData.name" 
              type="text" 
              placeholder="Your trainer name" 
              :class="{ 'input-error': errors.name }"
            />
            <span v-if="errors.name" class="error-msg">{{ errors.name }}</span>
          </div>

          <div class="input-group">
            <input 
              v-model="trainerData.email" 
              type="email" 
              placeholder="your@email.com" 
              :class="{ 'input-error': errors.email }"
            />
            <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
          </div>

          <button type="submit" :disabled="isSending">
            {{ isSending ? 'Sending...' : 'Subscribe' }}
          </button>
        </div>
      </form>

      <div v-else class="success-message">
        <p>Congratulations, trainer! Check your inbox.</p>
        <button @click="resetForm" class="btn-back">Go back</button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-glass {
  margin-top: auto; 
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  width: 100%;
}

.oak-branding h3 {
  margin-bottom: 8px;
}
.oak-branding p {
  margin-bottom: 30px;
}
/*
.oak-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}*/


.input-wrapper {
  display: flex;
  flex-direction: row; 
  justify-content: center;
  align-items: flex-start; 
  gap: 20px;
  flex-wrap: wrap;
}

.input-group {
  display: flex;
  flex-direction: column;
  text-align: left;
  min-width: 200px;
}

input {
  background: var(--input-bg, rgba(0, 0, 0, 0.05));
  border: 1px solid rgba(128, 128, 128, 0.2);
  color: var(--text-color, #2c3e50);
  padding: 10px 15px;
  border-radius: 8px;
  width: 100%;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #FB5584;
}

.input-error {
  border-color: #ff4d4d;
}

.error-msg {
  color: #ff4d4d;
  font-size: 0.75rem;
  margin-top: 4px;
  position: absolute; 
  transform: translateY(42px);
}

button {
  background: #FB5584;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: opacity 0.2s;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-back {
  margin-top: 10px;
  background: rgba(128, 128, 128, 0.1); 
  color: var(--text-color, #2c3e50); 
  border: 1px solid rgba(128, 128, 128, 0.3);
  transition: all 0.3s ease;
}

.btn-back:hover {
  background: rgba(128, 128, 128, 0.2);
}

@media (max-width: 600px) {
  .input-wrapper {
    flex-direction: column;
    align-items: center;
  }
  .error-msg {
    position: relative;
    transform: none;
    margin-bottom: 10px;
  }
}
</style>