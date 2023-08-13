<template>
<div>
  <h2> Check balance of wallet on chosen date </h2>
  <div class="container mt-1">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="mb-3">
          <label id="white-label" for="selectedDate" class="form-label">Select a date:</label>
          <input type="date" class="form-control" id="selectedDate" v-model="selectedDate">
        </div>
        <div class="mb-3">
          <button class="btn btn-primary" @click="checkBalance">Fetch balance for selected date</button>
        </div>
      </div>
    </div>
    <div v-if="showHistoricalBalanceMessage" class="row mt-5">
      <div class="col-md-12 text-center">
        <h4>{{ dateMessage }} </h4>
      </div>
    </div>
    <div v-if="showHistoricalBalanceMessage" class="row mt-3">
      <div class="col-md-6 mx-auto">
         <div class="transparent-card outlined-card">
          <div class="card-body">
            <h5 class="card-title outlined-text">Historical ETH Balance</h5>
            <p class="card-text outlined-text">{{ historicalEthBalanceMessage }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-6 mx-auto">
        <div class="transparent-card outlined-card">
          <div class="card-body">
            <h5 class="card-title outlined-text">Historical USDT Balance</h5>
            <p class="card-text outlined-text">{{ historicalUSDTBalanceMessage }}</p>
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
  data() {
    return {
      selectedDate: "",
      showHistoricalBalanceMessage:false,
      historicalEthBalanceMessage:"",
      historicalUSDTBalanceMessage:"",
      dateMessage:"",
    };
    
  }, 
   props:['address'],
  methods: {
    async checkBalance() {
      this.dateMessage = `On ${this.selectedDate} balance was:`;
      this.selectedDate = Date.parse(this.selectedDate)/1000;
      console.log(this.selectedDate)
      const response = await axios.get(`http://localhost:8080/transaction/infura/historicalEthBalance/address=${this.address}&timestamp=${this.selectedDate}`);

      const response2 = await axios.get(`http://localhost:8080/transaction/infura/historicalUsdtBalance/address=${this.address}&timestamp=${this.selectedDate}`);
      const balanceEth = response.data;
      const balanceUsdt = response2.data;
       if (balanceEth == -2) {
    alert("You have chosen date in the future");
     return;
  }
  if (balanceEth == -1) {
    alert("You have chosen date before the first ethereum transaction was created");
      this.historicalEthBalanceMessage= "Selected date was before first Eth transaction" ;  
  }else{
      this.historicalEthBalanceMessage= `ETH: ${balanceEth} `;
  }
      this.showHistoricalBalanceMessage = true;
      
      
      this.historicalUSDTBalanceMessage = `USDT: ${balanceUsdt}`
      
    }
  }
};
</script>

<style scoped>
.center{
  text-align: center;
}
h2,h4 {
  position: relative;
  color: rgba(255, 255, 255, 0.986);
  border: black;
  -webkit-text-stroke: 1px rgb(0, 0, 0);  
  z-index: 1;

}
h4::before, h2::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(216, 215, 215, 0); 
    backdrop-filter: blur(5px); 
    z-index: -1;
}
.form-label {
  color: white;
  -webkit-text-stroke: 1px rgb(0, 0, 0);  
  font-size: 160%;
  font-weight: bold;
}
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

</style>