<template>
    <div class="auth-container">
      <!-- Переключатель между входом и регистрацией -->
      <div class="toggle">
        <button @click="isLoginMode = true" :class="{ active: isLoginMode }">Вход</button>
        <button @click="isLoginMode = false" :class="{ active: !isLoginMode }">Регистрация</button>
      </div>
  
      <!-- Форма входа -->
      <form v-if="isLoginMode" @submit.prevent="login" class="form">
        <h2>Вход</h2>
        <div class="form-group">
          <label for="login-email">Email:</label>
          <input type="email" id="login-email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="login-password">Пароль:</label>
          <input type="password" id="login-password" v-model="password" required />
        </div>
        <button type="submit">Войти</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
  
      <!-- Форма регистрации -->
      <form v-else @submit.prevent="register" class="form">
        <h2>Регистрация</h2>
        <div class="form-group">
          <label for="register-name">Имя:</label>
          <input type="text" id="register-name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="register-email">Email:</label>
          <input type="email" id="register-email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="register-password">Пароль:</label>
          <input type="password" id="register-password" v-model="password" required />
        </div>
        <button type="submit">Зарегистрироваться</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  
  // Используем reactive для управления состоянием формы
  const email = ref('')
  const password = ref('')
  const name = ref('')
  const error = ref(null)
  const isLoginMode = ref(true) // Переключатель между формами
  

  const router = useRouter()
  
  // Функция для авторизации пользователя
  async function login() {
    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      })
  
      if (!response.ok) {
        throw new Error(await response.text())
      }
  
      alert('Авторизация прошла успешно!')
      router.push('/dashboard') // Переход на страницу после успешной авторизации
    } catch (err) {
      error.value = err.message
    }
  }
  
  // Функция для регистрации пользователя
  async function register() {
    try {
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
        }),
      })
  
      if (!response.ok) {
        throw new Error(await response.text())
      }
  
      alert('Регистрация прошла успешно!')
      isLoginMode.value = true // Переключение на форму входа после успешной регистрации
    } catch (err) {
      error.value = err.message
    }
  }
  </script>
  
  <style scoped>
  .auth-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  .toggle {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .toggle button {
    padding: 10px 20px;
    margin: 0 10px;
    border: none;
    border-radius: 4px;
    background-color: #f5f5f5;
    cursor: pointer;
  }
  
  .toggle button.active {
    background-color: #42b983;
    color: white;
  }
  
  .form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    margin-bottom: 5px;
  }
  
  .form-group input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button[type="submit"] {
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button[type="submit"]:hover {
    background-color: #38a16d;
  }
  
  .error {
    color: red;
    text-align: center;
  }
  </style>
  