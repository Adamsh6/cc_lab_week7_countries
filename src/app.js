import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: "#app",
    data: {
      totalPopulation: null,
      countries: [],
      selectedCountry: {},
      favouriteCountries: []
    },
    computed: {
      newNeighbouringCountries: function() {
        if(Object.keys(this.selectedCountry).length == 0){
          return [];
        }
        const borders = this.selectedCountry.borders
        const borderingCountries = [];
         borders.forEach((border) => {
           this.countries.forEach((country) => {
          if(country.alpha3Code === border)
            borderingCountries.push(country)
        })
      })
        return borderingCountries;
      }
    },
    created(){
      this.getTotalPopulation()
      this.getCountries()
    },
    methods: {
      getTotalPopulation: function() {
        return fetch("https://restcountries.eu/rest/v2/all")
        .then(response => response.json())
        .then(data => this.totalPopulation = data.reduce((acc, country) => acc + country.population, 0))
      },
      getCountries: function() {
        return fetch("https://restcountries.eu/rest/v2/all")
        .then(response => response.json())
        .then(data => this.countries = data)
      },
      addCountry: function() {
        if(!(this.favouriteCountries.includes(this.selectedCountry))){
        this.favouriteCountries.push(this.selectedCountry)
      }
      }

    }
  })
})
