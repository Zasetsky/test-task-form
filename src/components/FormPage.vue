<template>

<!-- 1 -->

  <h3>Ваш филиал</h3>
  <form>
    <div>
      <select name="cities" v-model="formBody.city.name" :disabled="formBody.city.isOnline">
        <option disabled hidden>Выберите город</option>
        <option 
          v-for="city in cities" 
          :key="city" 
          :value="city.title" 
          >
            {{ city.title }}
        </option>
      </select>
    </div>
    <input type="checkbox" name="terms" v-model="formBody.city.isOnline" value="true" />
          Онлайн

<!-- 2 -->

    <h3>Тема обращение</h3>      
    <div class="input">
      <input type="radio" id="one" value="Недоволен качеством услуг" v-model="radioButton">
      <label for="one">Недоволен качеством услуг</label>
      <br>
      <input type="radio" id="two" value="Расторжение договора" v-model="radioButton">
      <label for="two">Расторжение договора</label>
      <br>
      <input type="radio" id="two" value="Не приходит письмо активации на почту" v-model="radioButton">
      <label for="two">Не приходит письмо активации на почту</label>
      <br>
      <input type="radio" id="two" value="Не работает личный кабинет" v-model="radioButton">
      <label for="two">Не работает личный кабинет</label>
      <br>
      <input type="text" v-model="customInput" placeholder="другое">
    </div>   

<!-- 3 -->

    <h3>Описание проблемы</h3>
    <textarea placeholder="Введите текст" />

<!-- 4 -->

    <h3>Загрузка документов</h3>
    <p>Приложите, пожалуйста, полноэкранный скриншот.<br>
    Это поможет быстрее решить проблему.</p>
    <input type="file">

    <br>
    <button>Отправить</button>
  </form>
  <button @click="JC()" />
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
      isCustomInput: false
    }
  },
  
    watch: {
    'formBody.city.isOnline': function() {
        this.formBody.city.name = 'Выберите город'
    }
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

},

  mounted() {
    axios
    .get('https://6196084574c1bd00176c6ff1.mockapi.io/api/v1/cities')
    .then(response => (this.cities = response.data))
  },

  methods: {
    JC () {
      console.log(this.formBody.subject);
    }

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  text-align: left;
}
.form__group.is-required .form__label:before {
  content: '*';
  color: red;
  margin-right: 4px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
