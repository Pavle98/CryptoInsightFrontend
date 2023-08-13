<template>
  <div >
    <h2>Graph generator for account values over period of time</h2>
    <h5>Choose period of time you want to make graph for</h5>
    <date-range-picker-vue  @update:start="setStartDate" @update:end="setEndDate" />
    <div class="form-check form-switch d-inline-block mx-2">
      <input type="checkbox" class="form-check-input" id="eth" v-model="ethChecked">
      <label class="form-check-label" for="eth">ETH</label>
    </div>
    <div class="form-check form-switch d-inline-block mx-2">
      <input type="checkbox" class="form-check-input" id="usdt" v-model="usdtChecked">
      <label class="form-check-label" for="usdt">USDT</label>
    </div>
    <div>
    <button class="btn btn-primary my-3" @click="generateGraph">Generate Graph</button>
    </div>
    <div :style="{ backgroundColor: isGraphGenerated ? 'white' : 'transparent' }" id="chartContainer">
    <canvas id="myChart"></canvas>
</div>
    <button class="btn btn-danger my-3" @click="generatePDF">Export PDF</button>
  </div>
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js';
import DateRangePickerVue from '../components/DateRangePicker.vue';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const BASE_URL = "https://cryptoinsight-backend-ec574df726f0.herokuapp.com";
export default {
  components: {
    DateRangePickerVue,
  },
    props:['address'],
  data() {
    return {
      startDate: "",
      endDate: "",
      ethChecked: false,
      usdtChecked: false,
       isGraphGenerated: false,
    
    };
  },

  methods: {
    setStartDate(date) {
      this.startDate = date;
    },
    
    setEndDate(date) {
      this.endDate = date;
    },

    async generateGraph() {
  this.$emit('resetDateInputs');

  this.startDate = Date.parse(this.startDate)/1000;
  this.endDate = Date.parse(this.endDate)/1000;
  
  let datesETH = [];
  let datesUSDT = [];

  const datasets = [];

  if(this.ethChecked === true){
    try {
      const response = await axios.get(`${BASE_URL}/transaction/getValuesOverPeriodOfTime/ETH/address=${this.address}&startday=${this.startDate}&endday=${this.endDate}`);

      datesETH = response.data.map(item => {
        const date = new Date(item.date * 1000);
        return date.toISOString().slice(0, 10); // return date in 'YYYY-MM-DD' format
      });

      const balancesETH = response.data.map(item => item.value);

      datasets.push({
        label: 'ETH Balance',
        data: balancesETH,
        borderColor: 'red', // custom line color for ETH
         fill: false,
        // more options here
      });

    } catch (error) {
      console.error(error);
    }
  }
  
  if(this.usdtChecked === true){
    try {
      const response = await axios.get(`${BASE_URL}/transaction/getValuesOverPeriodOfTime/USDT/address=${this.address}&startday=${this.startDate}&endday=${this.endDate}`);

      datesUSDT = response.data.map(item => {
        const date = new Date(item.date * 1000);
        return date.toISOString().slice(0, 10); // return date in 'YYYY-MM-DD' format
      });

      const balancesUSDT = response.data.map(item => item.value);

      datasets.push({
        label: 'USDT Balance',
        data: balancesUSDT,
        borderColor: 'blue', // custom line color for USDT
         fill: false,
        // more options here
      });

    } catch (error) {
      console.error(error);
    }
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: this.ethChecked === true ? datesETH : datesUSDT, // use ETH dates if ETH checkbox checked, otherwise use USDT dates
      datasets: datasets
    },
    options: {
      // More options here
    }
  });
    this.isGraphGenerated = true;
}, async generatePDF() {
    let canvas = await html2canvas(document.getElementById('chartContainer'));
    let imgData = canvas.toDataURL('image/png');
    let pdf = new jsPDF('l', 'mm', 'a4'); // 2: orientation, 3: units, 4: format
    let width = pdf.internal.pageSize.getWidth();
    let height = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.text(`Wallet Address: ${this.address}`, 10, 10); // adding the wallet address on the top-left corner
    pdf.save("download.pdf");
  },   
  }  
  };
</script>

<style scoped>

h2, h5 {
    position: relative;
    color: rgba(255, 255, 255, 0.986);
    font-weight: bold;
    font-size: 200%;
    -webkit-text-stroke: 1px rgb(0, 0, 0);  
    z-index: 1; 
    padding: 5px; /* Added padding to provide some space for the background effect */
}

h2::before, h5::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0); 
    backdrop-filter: blur(5px); 
    z-index: -1; 
}
.form-check-label {
  color: white;
  position: relative;
  font-size: 150%;
  font-weight: bold;
  -webkit-text-stroke: 0.5px rgb(0, 0, 0);  
}

#chartContainer {
  background-color: rgba(255, 255, 255, 0.281);
  padding: 10px; 
  margin: 30px;
}

</style>