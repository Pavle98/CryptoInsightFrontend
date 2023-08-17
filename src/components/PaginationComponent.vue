<template>
  <div class="pagination">
    <button :disabled="currentPage === 1" @click="prevPage">Previous</button>
    <button
      v-for="page in displayedPages"
      :key="page"
      @click="setCurrentPage(page)"
      :class="{ active: currentPage === page }"
    >
      {{ page }}
    </button>
    <button :disabled="currentPage === totalPages" @click="nextPage">Next</button>
  </div>
</template>

<script>
export default {
  props: {
   totalItems: {
    type: Number,
    required: true
  },
     itemsPerPage: {
    type: Number,
    required: true
  },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  computed: {
  totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
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
  }
},
  methods: {
    setCurrentPage(page) {
      this.$emit('update:currentPage', page);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit('update:currentPage', this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('update:currentPage', this.currentPage + 1);
      }
    },
  }
};
</script>

<style scoped>
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
