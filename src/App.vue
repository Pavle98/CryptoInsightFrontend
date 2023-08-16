<template>
  <div id="app" class="bg-light">
     <div class="background-wrapper">
    <nav class="navbar navbar-expand-lg ">
       <router-link class="navbar-brand" to="/">
  <img src="@/assets/CryptoInsightLogo.png" alt="Logo" width="50" height="50">
</router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
        
             <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>

                <li class="nav-item">
              <router-link class="nav-link" to="/login">Login & Registration</router-link>
            </li>
            <li class="nav-item">
            </li>
          </ul>
        </div>

    </nav>
    <router-view/>
     </div>
  </div>
</template>

<script>


export default {

  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style>

html, body {
    height: 100%;
}
.navbar {
  
 background-color:  rgba(11, 15, 8, 0.089) !important;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
}
.background-wrapper {
  background-image: url(~@/assets/app-background.jpg);
  background-size: cover;      
  background-repeat: no-repeat; 
  background-position: center;
  background-color: rgba(255, 255, 255, 0.8) !important; 
    min-height: 100vh; 
}

.nav-link{
    color: rgba(255, 254, 254, 0.678) !important;
  -webkit-text-stroke: 1px rgb(0, 0, 0);  
  font-size: 120% !important;
  font-weight: bold !important;
}
.navbar-brand, .navbar-nav .nav-link {
  
  font-size: 0.9rem;
  padding: 0.1rem 0.5rem; 
}

</style>






