<template>
  <main class="container">
    <app-nav></app-nav>
    <router-view></router-view>
  </main>
</template>

<script>
import AppNav from './components/AppNav'
export default {
  components: {
    AppNav
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans|Patua+One|Roboto+Slab');

h1, h2, h3, h4, h5{
  margin: 2px;
}

body{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #F5F5F5;
  font-family: "Open Sans", sans-serif;
  margin: 0;

}

input, textarea{
  background-color: white;
  border: none;
}

input, label, button{
  border: none;
}

button {
    width: 200px;
    margin: 20px;
    padding: 15px;
    font-size: 1em;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    color: #FAFAFA;
}

button:focus{
  outline: none;
}

@media only screen 
  and (max-device-width: 768px) {
    button{
      height: 100px;
    }
}
</style>
