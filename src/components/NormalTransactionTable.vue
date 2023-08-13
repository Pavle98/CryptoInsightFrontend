<template>
  <div>
    <table class="custom-table">
      <thead>
        <tr>
          <th scope="col" class="text-center">Transaction Hash</th>
          <th scope="col" class="text-center">Method</th>
          <th scope="col" class="text-center">Block</th>
          <th scope="col" class="text-center">Time</th>
          <th scope="col" class="text-center">From</th>
          <th scope="col" class="text-center">To</th>
          <th scope="col" class="text-center">Value</th>
          <th scope="col" class="text-center">TxFee</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(transaction) in paginatedTransactions" :key="transaction.hash">
          <td :title="transaction.hash">{{ formatString(transaction.hash) }}</td>
          <td>{{ transaction.functionName }}</td>
          <td>{{ transaction.blockNumber }}</td>
          <td>{{ transaction.timeStamp }}</td>
          <td>
            <a :href="'http://localhost:8081/address=' + transaction.from" :title="transaction.from">
              {{ formatString(transaction.from) }}
            </a>
          </td>
          <td>
            <a :href="'http://localhost:8081/address=' + transaction.to" :title="transaction.to">
              {{ formatString(transaction.to) }}
            </a>
          </td>
          <td>{{ transaction.value }}</td>
          <td>{{ transaction.txFee }}</td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="prevPage">Previous</button>
        </li>
        <li class="page-item" 
            v-for="page in displayedPages" 
            :key="page" 
            :class="{ active: currentPage === page }">
          <button class="page-link" @click="setCurrentPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="nextPage">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
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
    totalPages() {
      return Math.ceil(this.transactions.length / this.itemsPerPage);
    },
    displayedPages() {
  const maxDisplayedPages = 10;
  const middlePage = Math.ceil(maxDisplayedPages / 2);
  let startPage = this.currentPage - middlePage + 1;
  let endPage = this.currentPage + middlePage - 1;

  if (this.totalPages <= maxDisplayedPages) {
    startPage = 1;
    endPage = this.totalPages;
  } else {
    if (startPage < 1) {
      startPage = 1;
      endPage = maxDisplayedPages;
    }
    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = this.totalPages - maxDisplayedPages + 1;
    }
  }

  return Array(endPage - startPage + 1)
    .fill()
    .map((_, i) => startPage + i);
},
  },
  methods: {
      formatString(string) {
    return string.substring(0, 6) + "..." + string.substring(string.length - 6);
  },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    prevPage() {
      this.currentPage--;
    },
    nextPage() {
      this.currentPage++;
    },
  },
};
</script>
<style>
.custom-table {
  width: 90%;
  margin: 0 auto;
  border-collapse: collapse;


}

.custom-table td,
.custom-table tr {
  padding: 0.5rem;
  text-align: left;
  border: 1px solid rgb(27, 4, 4);
  background-color: rgba(10, 3, 3, 0);
  
  color: #000000;
}

.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  padding: 0.5rem;
  margin: 0 0.25rem;
  cursor: pointer;
  color: #686868;
  outline: none;
  transition: background-color 0.3s;
}

.custom-table tr{
     background-color: rgba(247, 247, 247, 0.888);
}



</style>