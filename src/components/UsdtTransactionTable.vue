<template>
  <div>
    <table class = "custom-table">
      <thead>
        <tr>
          <th scope="col" class="text-center">Transaction Hash</th>
           <th scope="col" class="text-center">Time</th>
          <th scope="col" class="text-center">From</th>
          <th scope="col" class="text-center">To</th>
          <th scope="col" class="text-center">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in paginatedTransactions" :key="transaction.hash">
           <td>{{ formatString(transaction.hash) }}</td>
          <td>{{ transaction.timeStamp }}</td>
              <td>
            <a :href="'https://www.cryptoinsight360.com/address=' + transaction.from">
              {{ formatString(transaction.from) }}
            </a>
               <CopyButton :textToCopy="transaction.from" />
          </td>
          <td>    <a :href="'https://www.cryptoinsight360.com/address=' + transaction.to">
               {{ formatString(transaction.to) }}
            </a> 
                        <CopyButton :textToCopy="transaction.to" />
            </td>
          <td>{{ transaction.value }}</td>
        </tr>
      </tbody>
    </table>
   <Pagination
  :itemsPerPage="itemsPerPage"
   :totalItems="transactions.length"
  :currentPage.sync="currentPage"
/>
  </div>
</template>

<script>
import CopyButton from './CopyButtonComponent.vue';
import Pagination from './PaginationComponent.vue';

export default {
  components:{
    Pagination,
    CopyButton
  },
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    paginatedTransactions() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.transactions.slice(startIndex, endIndex);
    },
  },
  methods: {
    
          formatString(string) {
    return string.substring(0, 6) + "..." + string.substring(string.length - 6);
  },
  
  },
};
</script>

<style scoped>
table {
  width: 90%;
  border-collapse: collapse;
}

.custom-table td{
  padding: 0.5rem;
  text-align: left;
  border: 1px solid rgb(27, 4, 4);
  background-color: rgba(10, 3, 3, 0);
 overflow-x: auto;
  color: #000000;
}

</style>
