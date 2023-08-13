<template>
  <div class="d-flex justify-content-around my-0">
    <div class="form-group">
      <label class="white-label" for="start-date">Start Date:</label>
      <input type="date" id="start-date" class="form-control" v-model="startDate" @input="updateStartDate">
    </div>
    <div class="form-group">
      <label class="white-label" for="end-date">End Date:</label>
      <input type="date" id="end-date" class="form-control" v-model="endDate" @input="updateEndDate">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: "",
      endDate: "",
    };
  },
  methods: {
    updateStartDate() {
      this.$emit('update:start', this.startDate);
    },
    updateEndDate() {
      this.$emit('update:end', this.endDate);
    },
  },
    created() {
    this.$parent.$on('resetDateInputs', () => {
      this.startDate = "";
      this.endDate = "";
    });
  },
};
</script>

<style scoped>
.white-label {
  color: white;
  -webkit-text-stroke: 1px rgb(0, 0, 0);  
  font-size: 160%;
  font-weight: bold;
}
</style>