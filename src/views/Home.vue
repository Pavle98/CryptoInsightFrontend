<template>
  <div class="home">
    <h2 class="center">Enter wallet address:</h2>
    <form @submit.prevent="handleSubmit" class="mt-3">
      <div class="row">
        <div class="col-9 mx-auto">
          <div v-if="!isAddressValid" class="text-danger">Please enter a valid wallet address</div>
          <div class="input-group mb-3">
            <input 
              type="text" 
              class="form-control" 
              v-model="address" 
              :class="{ 'is-valid': isAddressValid, 'is-invalid': !isAddressValid }" 
              placeholder="Wallet address"
            >
            <button 
              type="submit" 
              class="btn btn-primary" 
              :disabled="!isAddressValid"
            >
              Submit
            </button>
          </div>
          
        </div>
      </div>
    </form>
    <h1 class="center">Latest Ethereum Block Transactions </h1>
    <normal-transaction-table  :transactions="lastEthTransactions" />
  </div>
</template>

<script>
import axios from "axios";
import NormalTransactionTable from "@/components/NormalTransactionTable.vue";
const BASE_URL = "https://cryptoinsight-backend-ec574df726f0.herokuapp.com";
export default {
  name: 'Home',
  data() {
    return {
      address: '',
      lastEthTransactions: [],
    };
  },
  components:{
    NormalTransactionTable,
  },
  computed: {
    isAddressValid() {
      const addressPattern = /^0x[a-fA-F0-9]{40}$/;
      return addressPattern.test(this.address);
    },
  },
  methods: {
    async handleSubmit() {
      if (!this.isAddressValid) return;
      try {
        this.$router.push({
          name: "AddressInfo",
          params: {
            address: this.address,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
    async fetchLastTransactions(){
      try{
        const response = await axios.get(`${BASE_URL}/transaction/getlatesttransactions`);
        this.lastEthTransactions = response.data;
      }catch(error){
        console.log(error);
      }
    }
  },
  created(){
    this.fetchLastTransactions();
  },
};
</script>

<style >
.center {
  text-align: center;
}

.is-invalid {
  border-color: red;
}
.home h1, .home h2 {
  position: relative;
  color: rgba(255, 255, 255, 0.986);
  border: black;
  -webkit-text-stroke: 1px rgb(0, 0, 0);  
  z-index: 1;
  padding: 5px;

}

.home h1::before, .home h2::before {
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

</style>
