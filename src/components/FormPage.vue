<template>
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
    }
  },
  
  mounted() {
    axios
    .get('https://6196084574c1bd00176c6ff1.mockapi.io/api/v1/cities')
    .then(response => (this.cities = response.data))
  },

  methods: {
    JC () {
      console.log(this.formBody.city);
    }

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
