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
          </td>
          <td>
            <a :href="'https:///www.cryptoinsight360.com/address=' + transaction.to">
             {{ formatString(transaction.to) }}
            </a>
          </td>
          <td>{{ transaction.value }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="prevPage">Previous</button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="setCurrentPage(page)"
        :class="{ active: currentPage === page }"
      >
        {{ page }}
      </button>
      <button :disabled="currentPage === totalPages" @click="nextPage">Next</button>
    </div>
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

.pagination button.active {
  background-color: #ddd;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
