<template>
  <AuthComp/>
  <div id="app">
    <h1>Отправить письмо</h1>
    <form @submit.prevent="sendEmail"> <!-- Обработчик отправки формы -->
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="emailData.email" required />
      </div>
     
      <button type="submit">Отправить</button>
    </form>
    <p v-if="responseMessage">{{ responseMessage }}</p> <!-- Отображение ответа от сервера -->
  </div>
</template>

<script setup>
import { ref } from 'vue'; 
import axios from 'axios';
import AuthComp from './AuthComp.vue'
// Определяем реактивные данные
const emailData = ref({
  email: '', // поле для ввода email
});

const responseMessage = ref(''); // сообщение об успешной отправке или ошибке


const sendEmail = async () => {
  try {

    const response = await axios.post('http://localhost:3001/sendmail', emailData.value);


    responseMessage.value = response.data.message;
  } catch (error) {
    responseMessage.value = 'Ошибка при отправке письма: ' + error.response.data.error;
  }
};



</script>

<style>
#app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

form {
  display: flex;
  flex-direction: column;
}

form div {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input,
textarea {
  padding: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}


</style>
