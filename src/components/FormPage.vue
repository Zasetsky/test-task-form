<template>

<!-- 1 -->
  <h1>Форма подачи заявки в отдел сервиса и качества</h1>
  <form>
    <div class="container">
      <h3>Ваш филиал<span>*</span></h3>
      <div>
        <select name="cities" v-model="formBody.city.name" :disabled="formBody.city.isOnline">
          <option disabled selected hidden>Выберите город</option>
          <option 
            v-for="city in cities" 
            :key="city" 
            :value="city.title" 
            >
              {{ city.title }}
          </option>
        </select>
      </div>
      <input class="qwe" type="checkbox" name="terms" v-model="formBody.city.isOnline" value="true" />
            Онлайн

  <!-- 2 -->

      <h3>Тема обращение<span>*</span></h3>      
      <div class="input">
        <input class="qwe" type="radio" id="one" value="Недоволен качеством услуг" v-model="radioButton">
        <label for="one">Недоволен качеством услуг</label>
        <br>
        <input class="qwe" type="radio" id="two" value="Расторжение договора" v-model="radioButton">
        <label for="two">Расторжение договора</label>
        <br>
        <input class="qwe" type="radio" id="two" value="Не приходит письмо активации на почту" v-model="radioButton">
        <label for="two">Не приходит письмо активации на почту</label>
        <br>
        <input class="qwe" type="radio" id="two" value="Не работает личный кабинет" v-model="radioButton">
        <label for="two">Не работает личный кабинет</label>
        <br>
        <input class="text_input" type="text" v-model="customInput" placeholder="другое">
      </div>   

  <!-- 3 -->

      <h3>Описание проблемы<span>*</span></h3>
      <textarea v-model="formBody.problem" placeholder="Введите текст" />

  <!-- 4 -->

      <h3>Загрузка документов</h3>
      <p>Приложите, пожалуйста, полноэкранный скриншот.<br>
      Это поможет быстрее решить проблему.</p>
      <input type="file">

      <br>
      <button :disabled="isDisabled" @click.prevent="toSend()">ОТПРАВИТЬ</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FormPage',

  data() {
    return {
      formBody: {
        city: {
          name: 'Выберите город',
          isOnline: false
        },
        subject: '',
        problem: '',
        file: []
      },
      cities: [],
      isCustomInput: false,
    }
  },
  
    watch: {
    'formBody.city.isOnline': function() {
        this.formBody.city.name = 'Выберите город'
    },
  },

  computed: {
     radioButton: {
    get: function () {
      if (!this.isCustomInput) {
        return this.formBody.subject
      }
      return ''
    },
    // сеттер:
    set: function (value) {
      this.formBody.subject = value
      this.isCustomInput = false
    }
  },

   customInput: {
    get: function () {
      if (this.isCustomInput) {
        return this.formBody.subject
      }
      return ''
    },
    // сеттер:
    set: function (value) {
      this.formBody.subject = value
      this.isCustomInput = true
    }
  },

      isDisabled() {
      if 
      (
        (this.formBody.city.isOnline || this.formBody.city.name !== 'Выберите город') 
        && this.formBody.subject 
        && this.formBody.problem
      ) {
          return false
      }
          return true
    }

},

  mounted() {
    axios
    .get('https://624d935653326d0cfe4f0ab4.mockapi.io/api/v1/cities')
    .then(response => (this.cities = response.data))
  },

  methods: {
    async toSend() {
     await axios.post('https://624d935653326d0cfe4f0ab4.mockapi.io/api/v1/send-form', this.formBody)
     .then(response => (this.success = response.data.success))

     if (this.success) {
        this.$router.push('/success')
     } else {
        alert('Ошибка отправки заявки')
     }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  text-align: left;
}

span {
  color: red;
  margin-left: 4px;
}

form {
  border: 1px solid;
}

select {
  color: gray;
  width: 200px;
  height: 30px;
}

option:not(:first-of-type) {
  color: black;
}

.container {
  margin-left: 25px;
}

.qwe {
  margin-top: 20px;
  transform:scale(2);
  opacity:0.9;
  cursor:pointer;
  }

.input label {
  margin-left: 10px;
}

.input {
  margin-top: -20px
}

.text_input {
  margin-top: 15px;
  width: 200px;
  height: 5px;
  padding: 10px;
}

textarea {
  padding: 10px;
  width: 800px;
  height: 100px;
  resize: none;
}

button {
  margin-top: 20px;
  margin-bottom: 30px;
  padding: 10px;
  width: 115px;
  text-align: center;
  color: rgb(255, 255, 255);
  background: rgb(236, 141, 64);
  border: none;
}
button:disabled {
  background: rgb(227, 227, 227);
  border: none;
}
</style>
