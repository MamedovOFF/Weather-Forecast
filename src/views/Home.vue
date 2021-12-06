<template>
  <div class="home">
    <div style="display: flex;">
      <div class="bd-sidebar border-bottom-0 col-md-3 col-xl-2 col-12 nav-side">
        <b-input-group>
          <b-form-input placeholder="Search" v-model="search"></b-form-input>

          <b-input-group-append>
            <b-button variant="success" @click="chek(search)">+</b-button>
          </b-input-group-append>
        </b-input-group>
        <b-list-group class="list-weather">
          <b-list-group-item class="btn-chek" v-for="el of allCity" :key="el" @click="chek(el)">
            {{ el }}
          </b-list-group-item>
        </b-list-group>
      </div>
      <div class="container container-back" style="display: flex">
        <div class="row" style="margin-right: 0">
            <div v-for="el in currentCity" :key="el" class="col-2 card-itm">
              <b-card
                  v-if="el.temp"
                  :title="el.city"
                  :img-src="el.img"
                  img-alt="Image"
                  img-top
                  tag="article"
                  style="width: 10rem; height: 25rem; border: none"
              >
                <b-card-text>
                  <p style="height: 3rem">{{ el.description }}</p>
                  <p>{{  el.time[1] }}</p>
                  <p>{{ Math.ceil(el.temp) }}</p>
                </b-card-text>
              </b-card>
            </div>
        </div>
      </div>
    </div>
    <b-alert
        :show="error"
        variant="danger"
        class="alert-itm"
    >Something went wrong</b-alert>
    <b-alert
        variant="info"
        class="alert-itm"
        :show="error_text_flag"
    >{{ error_text }}</b-alert>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";


export default {
  data() {
    return {
      allCity: ['Москва', 'Казань', 'Якутск', 'Токио', 'Сеул'],
      search: null,
      error_text: null,
      error_text_flag: null,
      currentCity: [
        {
          city: null,
          description: null,
          img: null,
          temp: null,
          time: null
        }
      ],
      error: null
    }
  },
  name: 'Home',
  methods: {
    async chek(el) {
      await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${el}&appid=b17b82015893e71e82f1d06528e78ab7&lang=ru&units=metric`)
          .then((response) => {
            this.deleteObject()
            for (let i = 1; i < 7; i++)
            {
              this.currentCity.push({
                city : response.data.city.name,
                description : response.data.list[i].weather[0].description,
                temp : response.data.list[i].main.temp,
                img : `http://openweathermap.org/img/wn/${response.data.list[i].weather[0].icon}@2x.png`,
                time: response.data.list[i].dt_txt.split(' ')
              })
            }
            if (this.search != null)
            {
              if (this.allCity.includes(el)) {
                this.error_text = 'This city already exists'
                this.error_text_flag = true
                setTimeout(() => {
                  this.error_text_flag = false
                }, 1000)
              } else {
                this.allCity.push(el)
              }
            }
            this.search = null
          })
          .catch(() => {
            this.error = true
            setTimeout(() => {
              this.error = false
            }, 1000)
          })
    },
    deleteObject () {
      for (let el in this.currentCity)
        delete this.currentCity[el]
      this.currentCity.length = 0
    }
  }
}
</script>
<style lang="scss">
.alert-itm {
  position: absolute !important;
  top: 82%;
  left: 20%;
}
.container-back{
  background-image: url("../../public/backjfif.png");
}
.card-itm {
  margin: 2rem 0;
}
.nav-side {
  background-color: #17a2b7;
  height: inherit;
}

.list-weather {
  height: 73.6vh;
  overflow-y: auto;
  margin: 10px auto;
}

.btn-chek {
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
}
</style>