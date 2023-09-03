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
    const maxDisplayedPages = window.innerWidth <= 768 ? 5 : 10; // If screen width is less than or equal to 768px, show only 5 pages, else show 10.
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
  display: flex;  
  justify-content: center;  
  flex-wrap: wrap;  
}


.pagination button {
  padding: 0.3rem 0.5rem; /* reduced size */
  margin: 0.2rem; /* increased spacing */
}

.pagination button.active {
  background-color: #ddd;
}
</style>
