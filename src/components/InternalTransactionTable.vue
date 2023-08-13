<template>
  <div>
    <table class = "custom-table">
      <thead>
        <tr>
          <th scope="col" class="text-center">Parent Txn Hash</th>
          <th scope="col" class="text-center">Block</th>
          <th scope="col" class="text-center">Time</th>
          <th scope="col" class="text-center">From</th>
          <th scope="col" class="text-center">To</th>
          <th scope="col" class="text-center">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in paginatedTransactions" :key="transaction.hash">
          <td>{{ formatString(transaction.hash) }}</td>
          <td>{{ transaction.blockNumber }}</td>
          <td>{{ transaction.timeStamp }}</td>
          <td>
            <a :href="'https://cryptoinsight-frontend-8ec4c0098af9.herokuapp.com/address=' + transaction.from">
              {{ formatString(transaction.from) }}
            </a>
          </td>
          <td>    <a :href="'https://cryptoinsight-frontend-8ec4c0098af9.herokuapp.com/address=' + transaction.to">
               {{ formatString(transaction.to) }}
            </a> 
            </td>
          <td>{{ transaction.value }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="prevPage">&lt;</button>
      <button
        v-for="page in displayedPages"
        :key="page"
        @click="setCurrentPage(page)"
        :class="{ active: currentPage === page }"
      >
        {{ page }}
      </button>
      <button :disabled="currentPage === totalPages" @click="nextPage">&gt;</button>
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
      displayedPages: [],
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
      this.displayedPages = this.getDisplayedPages();
    },
    prevPage() {
      this.currentPage--;
      this.displayedPages = this.getDisplayedPages();
    },
    nextPage() {
      this.currentPage++;
      this.displayedPages = this.getDisplayedPages();
    },
    getDisplayedPages() {
      const maxDisplayedPages = 10;
      const halfMaxDisplayedPages = Math.floor(maxDisplayedPages / 2);
      let startPage = this.currentPage - halfMaxDisplayedPages;
      if (startPage < 1) {
        startPage = 1;
      }
      let endPage = startPage + maxDisplayedPages - 1;
      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = endPage - maxDisplayedPages + 1;
        if (startPage < 1) {
          startPage = 1;
        }
      }
      const displayedPages = [];
      for (let i = startPage; i <= endPage; i++) {
        displayedPages.push(i);
      }
      return displayedPages;
    },
  },
  created() {
    this.displayedPages = this.getDisplayedPages();
  },
};
</script>

<style scoped>
.custom-table {
    table-layout: fixed;
  width: 90%;
  margin: 0 auto;
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

</style>
