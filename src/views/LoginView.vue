
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-7">

 <div>
<ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
      <li class="nav-item" role="presentation">
        <a class="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
          aria-controls="pills-login" aria-selected="true">Login</a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
          aria-controls="pills-register" aria-selected="false">Register</a>
      </li>
    </ul>

<div class="tab-content">
  <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
    <form @submit.prevent="login">

      <!-- Email input -->
      <div class="form-outline mb-4">
        <input type="text" id="loginName" class="form-control" />
        <label class="form-label" for="loginName">Username</label>
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <input type="password" id="loginPassword" class="form-control" />
        <label class="form-label" for="loginPassword">Password</label>
      </div>


      <div class="row mb-4">
        <div class="col-md-6 d-flex justify-content-center">

          <div class="form-check mb-3 mb-md-0">
            <input class="form-check-input" type="checkbox" value="" id="loginCheck" checked />
            <label class="form-check-label" for="loginCheck"> Remember me </label>
          </div>
        </div>

        <div class="col-md-6 d-flex justify-content-center blurred-background">
          <a href="#!">Forgot password?</a>
        </div>
      </div>

      <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>

      <div class="text-center">
        <p>Not a member? <a href @click = "switchToRegister($event)">Register</a></p>
      </div>
    </form>
  </div>
  <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
    <form @submit.prevent="register">

      <div class="form-outline mb-4">
        <input type="text" id="registerUsername" class="form-control" />
        <label class="form-label" for="registerUsername">Username</label>
      </div>

      <div class="form-outline mb-4">
        <input type="email" id="registerEmail" class="form-control" />
        <label class="form-label" for="registerEmail">Email</label>
      </div>
      <div class="form-outline mb-4">
        <input type="password" id="registerPassword" class="form-control" />
        <label class="form-label" for="registerPassword">Password</label>
      </div>
      <div class="form-outline mb-4">
        <input type="password" id="registerRepeatPassword" class="form-control" />
        <label class="form-label" for="registerRepeatPassword">Repeat password</label>
      </div>
      <button type="submit" class="btn btn-primary btn-block mb-3">Register</button>
    </form>
  </div>
</div>
 </div>
      </div>
</div>
 </div>
</template>

<script>
import axios from 'axios';
export default {
  
  data(){
      return {
      registerUsername: '',
      registerEmail: '',
      registerPassword: '',
      registerRepeatPassword: ''
      };
  },
  methods: {
    switchToRegister(event) {
      // Switch to the "Register" tab
      event.preventDefault();
      const registerTab = document.getElementById('tab-register');
      registerTab.click();
    },
    async register(){
       if ( document.getElementById('registerPassword').value !== document.getElementById('registerRepeatPassword').value ) {
        alert('Passwords do not match');
        return;
      }
      const user = {
    username: document.getElementById('registerUsername').value,
    email: document.getElementById('registerEmail').value,
    password: document.getElementById('registerPassword').value,
    repeatPassword: document.getElementById('registerRepeatPassword').value 
  };
     

      try {
        const response = await axios.post('http://localhost:8080/users/register', user,{

          headers: {
        'Content-Type': 'application/json'
      }
        });

        // Handle success
        alert('Registration successful');
        // Redirect or do something else on success
      } catch (error) {
        // Handle error
        alert('Registration failed');
        console.error(error);
      }
    },
    async login() {
  const username = document.getElementById('loginName').value;
  const password = document.getElementById('loginPassword').value;

  // Prepare user data
  const userDto = {
    username: username,
    password: password
  };

  try {
    const response = await axios.post('http://localhost:8080/users/login', userDto, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Handle success
    // You might store a token, redirect, or take other appropriate actions
    alert('Login successful');
  } catch (error) {
    // Handle error
    alert('Login failed');
    console.error(error);
  }
}
  }
}
</script>

<style scoped>
.form-check-input {
    display: none;
}
.form-outline {
    background-color: rgba(233, 232, 232, 0.815); /* semi-transparent black */
    padding: 5px;
    border-radius: 5px;
}
.form-control {
 
    color: #ffffff6b; /* white text color */
}

.form-label {
    color: #ffffff; 
}
.form-check-label, .text-center {
    color: white;
    position: relative;
    font-size: 130%;
    font-weight: bold;
    -webkit-text-stroke: 0.5px rgb(0, 0, 0);
    
    /* Blur effect */
    background-color: rgba(58, 57, 58, 0.5); 
    backdrop-filter: blur(10px); 
    padding: 10px;
    border-radius: 5px; 
}
.blurred-background {
   font-size: 130%;
    background-color: rgba(0, 0, 0, 0.5); 
    backdrop-filter: blur(10px); 
    padding: 5px 10px;
    border-radius: 5px; 
}
#tab-login {
    color: #FFF;
    background-color: rgba(33, 96, 160, 0.911); 
}


#tab-register {
     background-color: rgba(33, 96, 160, 0.911);
}


</style>