<template>
<div  class="center">
<wallet-information-vue :address="address" />
<graph-generator :address="address" />
<fetch-historical-value :address="address" />
<search-transactions-vue :address="address"/>
 
  </div>
</template>

<script>
import GraphGenerator from '../components/GraphGenerator.vue';
import FetchHistoricalValue from '../components/FetchHistoricalValue.vue';
import WalletInformationVue from '../components/WalletInformation.vue';
import SearchTransactionsVue from '../components/SearchTransactions.vue';
export default {
 components: {
    GraphGenerator,
    FetchHistoricalValue,
    WalletInformationVue,
    SearchTransactionsVue
  },
  params: {
    balance: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    address:{
      type: String,
      required: true,
    }
  },
    created() {
    this.address = this.$route.params.address;
  },



};
</script>

<style>
.center {
  text-align: center;
}
.button-container, .table-container {
  display: inline-block;
  vertical-align: top;
  margin-right: 1px;
}
.card {
  background-color: #e7f0f7;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #c3d3e8;
}

.card-title {
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: bold;
}

.card-text {
  color: #34495e;
  font-size: 1.5rem;
  font-weight: bold;
}
.custom-bg {
  background-color: #0066cc;
}
.row {
  margin: 0;
}

.mb-3 {
  margin-bottom: 1.5rem;
}

.h2 {
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}
div {
  margin-bottom: 30px;
}
</style>