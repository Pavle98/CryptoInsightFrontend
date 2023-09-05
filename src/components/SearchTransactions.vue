<template>


<div>
      
    <h2>Search Transactions by block number or date</h2>
<div>
        <input class="form-check-input" type="radio" id="date" value="date" v-model="picked">
        <label class ="white-label" for="date">Date</label>
 <input class="form-check-input" type="radio" id="block" value="block" v-model="picked" >
        <label class ="white-label" for="block">Block Number</label>
    </div>
 <div v-if="picked === 'block'">
  <label  class ="white-label" for="starting-block">Starting Block:</label>
  <input class ="custom-input" id="starting-block" v-model="startingBlock" type="number">
  
  <label class ="white-label"  for="ending-block" style="margin-left: 25px;" >Ending Block:</label>
  <input class ="custom-input"  id="ending-block" v-model="endingBlock" type="number">
</div>
 <div v-if="picked === 'date'">
     <date-range-picker-vue @update:start="setStartDate" @update:end="setEndDate" />
  </div>

<div class="button-container">
  <button class="btn btn-info"  @click="showNormalTransactions = true; showInternalTransactions = false, showUsdtTransactions = false,showAllTokenTransactions = false; fetchNormalTransactions()">Normal Transactions</button>
  <button class="btn btn-info"  @click="showInternalTransactions = true; showNormalTransactions = false, showUsdtTransactions = false,showAllTokenTransactions = false; fetchInternalTransactions()">Internal Transactions</button>
  <button class="btn btn-info"  @click="showUsdtTransactions = true; showNormalTransactions = false, showInternalTransactions = false,showAllTokenTransactions = false; fetchUsdtTransactions()">USDT Transactions</button>
  <button class="btn btn-info"  @click="showAllTokenTransactions = true; showNormalTransactions = false, showInternalTransactions = false, showUsdtTransactions = false; fetchAllTokenTransactions()">Token Transactions</button>
</div>


    <div class="table-container">
      <normal-transaction-table v-if="showNormalTransactions" :transactions="normalTransactions" />
      <internal-transaction-table v-if="showInternalTransactions" :transactions="internalTransactions" />
      <usdt-transaction-table v-if="showUsdtTransactions" :transactions="usdtTransactions" />
      <token-transaction-table v-if="showAllTokenTransactions" :transactions="allTokenTransactions" />
    </div>

    </div>
</template>

<script>
import axios from "axios";
import NormalTransactionTable from "@/components/NormalTransactionTable.vue";
import InternalTransactionTable from "@/components/InternalTransactionTable.vue";
import UsdtTransactionTable from '../components/UsdtTransactionTable.vue';
import TokenTransactionTable from '../components/TokenTransactionTable.vue';
import DateRangePickerVue from './DateRangePicker.vue';
const BASE_URL = "https://cryptoinsight-backend-ec574df726f0.herokuapp.com";
export default {
components: {
    NormalTransactionTable,
    InternalTransactionTable,
    UsdtTransactionTable,
    TokenTransactionTable,
    DateRangePickerVue,
  },
   data() {
    return {
      showNormalTransactions: false,
      showInternalTransactions: false,
      showUsdtTransactions:false,
      showAllTokenTransactions: false,
      normalTransactions: [],
      internalTransactions: [],
      usdtTransactions:[],
      allTokenTransactions:[],
      startingBlock: '',
      endingBlock: '',
       picked: '',
        startDate: "",
      endDate: "",
      
    };
  },
  props:['address'],
   methods: {
     async dateToBlocks(){
            //napraviti rutu na bekendu koja ce vratiti broj blocka po datumu koji je prosledjen, vec imamo tu metodu, samo rutu napraviti
           

             this.startDate = Date.parse(this.startDate)/1000
             this.endDate =  Date.parse(this.endDate)/1000
             this.startingBlock = await (await axios.get(`${process.env.VUE_APP_BACKEND_URL}/transaction/dateToBlockNumber/timestamp=${this.startDate}`)).data;
             this.endingBlock = await (await axios.get(`${process.env.VUE_APP_BACKEND_URL}/transaction/dateToBlockNumber/timestamp=${this.endDate}`)).data;
             this.startingBlock = parseInt(this.startingBlock, 16);
             this.endingBlock = parseInt(this.endingBlock, 16);
             this.$emit('resetDateInputs');

            
     },
     setStartDate(date) {
      this.startDate = date;

    },
    
    setEndDate(date) {
      this.endDate = date;
            console.log(this.startDate + this.endDate)
    },
   
     async fetchNormalTransactions() {
       if(this.picked === 'date'){
       await this.dateToBlocks();
      }
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/transaction/getnormaltransactions/address=${
this.address}&startblock=${this.startingBlock}&endblock=${this.endingBlock}`);

        this.normalTransactions = response.data;
      } catch (error) {
        console.error(error);

      }
    },
    async fetchInternalTransactions() {
        if(this.picked === 'date'){
       await this.dateToBlocks();
      }
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/transaction/getinternaltransactions/address=${this.address}
&startblock=${this.startingBlock}&endblock=${this.endingBlock}`);
  
        this.internalTransactions = response.data;
      } catch (error) {
        console.error(error);

      }
    },
    async fetchUsdtTransactions() {
        if(this.picked === 'date'){
       await this.dateToBlocks();
      }
      try {

        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/transaction/getusdttransactions/address=${this.address}
&startblock=${this.startingBlock}&endblock=${this.endingBlock}`);
  
        this.usdtTransactions = response.data;
      } catch (error) {
        console.error(error);

      }
    },
      
    async fetchAllTokenTransactions() {
        if(this.picked === 'date'){
       await this.dateToBlocks();
      }
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/transaction/getalltokentransactions/address=${this.address}
&startblock=${this.startingBlock}&endblock=${this.endingBlock}`);
  
        this.allTokenTransactions = response.data;
      } catch (error) {
        console.error(error);

      }
    },
  },

}
</script>

<style scoped>
.custom-input {
  background-color: #fffefe;  
            
  padding: 10px;             
  margin: 10px 0;             
  color: black;              
}.button-container, .table-container {
  width: 100%;
}
@media (max-width: 768px) {
  .custom-button {
    margin-left: 2px; 
    margin-top: 5px; 
  }
}
.white-label {
  color: white;
  -webkit-text-stroke: 1px rgb(0, 0, 0);  
  font-size: 120%;
  font-weight: bold;
}
.btn-info {
   width: 200px;  
   margin-left: 2px; 
    margin-top: 5px; 
  white-space: nowrap;  
  overflow: hidden;     
  text-overflow: ellipsis;  
}
h2 {
  position: relative;
  color: rgba(255, 255, 255, 0.986);
  border: black;
  -webkit-text-stroke: 1px rgb(0, 0, 0);  
  z-index: 1;

}
h2::before {
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