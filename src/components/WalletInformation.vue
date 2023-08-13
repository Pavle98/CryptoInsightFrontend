<template>
  <div>
    <h2 >Wallet Information</h2>
<div class="row mb-3">
  <div class="col-md-6 px-4">
   <div class="transparent-card outlined-card">
      <div class="card-body">
        <h5 class="card-title outlined-text">ETH Balance</h5>
        <p class="card-text outlined-text">{{ this.ethBalance }}</p>
      </div>
    </div>
  </div>
  <div class="col-md-6 px-4">
    <div class="transparent-card outlined-card">
      <div class="card-body">
        <h5 class="card-title outlined-text">Value</h5>
        <p class="card-text outlined-text">${{ this.value }}</p>
      </div>
    </div>
  </div>
</div>
<div class="row mb-3">
  <div class="col-md-6 px-4">
     <div class="transparent-card outlined-card">
      <div class="card-body">
        <h5 class="card-title outlined-text">USDT Balance</h5>
        <p class="card-text outlined-text">{{ this.usdtBalance }}</p>
      </div>
    </div>
  </div>
  <div class="col-md-6 px-4">
     <div class="transparent-card outlined-card">
      <div class="card-body">
         <h5 class="card-title outlined-text">Address</h5>
        <p class="card-text outlined-text">{{ this.address }}</p>
      </div>
    </div>
  </div>
</div>
</div>
</template>
<script>

import axios from "axios";
const BASE_URL = "https://cryptoinsight-backend-ec574df726f0.herokuapp.com";
export default {
  props:['address'],
   data() {
    return {
      ethBalance: 0.0,
      usdtBalance: 0.0,
      value: 0.0,

    };
  },
  methods: {
   async fetchEthereumData() {
      try {
        const response = await axios.get(`${BASE_URL}/transaction/getbalance/${this.address}`);
        if(response.data.balance == -1){
            this.$router.push({
          name: "Home",
        });
          alert("Bad format for address or address doesnt exist");
          return;
        }
        this.ethBalance = response.data.balance;
        this.value = response.data.value;
        console.log(this.ethBalance)
        console.log(this.value)
      } catch (error) {
        console.error(error);
      }
    },
    async fetchUsdtData() {
      try {
      
        const response = await axios.get(`${BASE_URL}/transaction/getusdtbalance/${this.address}`);

        this.usdtBalance = response.data;
        if(this.usdtBalance == -1){
          return;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  created(){
        console.log("is created but not working?")
        this.fetchEthereumData();
        this.fetchUsdtData();
  }
}
</script>

<style scoped>
.transparent-card {
    background-color: rgba(247, 247, 247, 0.384); 
    border: none;
}
.outlined-text {
    color: white;
    -webkit-text-stroke: 1px black; 
    text-shadow: 1px 1px 0px #000, -1px -1px 0px #000, -1px 1px 0px #000, 1px -1px 0px #000;
}
.outlined-card {
    border: 2px solid black;
}

h2 {
  color: rgba(255, 255, 255, 0.986);
  border: black;
  -webkit-text-stroke: 1px rgb(0, 0, 0);  

}
</style>