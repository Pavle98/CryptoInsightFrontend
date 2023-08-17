
<template>
  <button class="copy-button" @click="copyToClipboard">Copy</button>
</template>

<script>
export default {
  props: ['textToCopy'],
  methods: {
    copyToClipboard() {
      let dummy = document.createElement('textarea');
      document.body.appendChild(dummy);
      dummy.value = this.textToCopy;
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
      
      alert('Address copied to clipboard!');
    }
  }
}
</script>

<style>
.copy-button {

  background-color: #2e0041c0;
  color: white;
  padding: 5px 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
   display: block;
  margin-left: auto;
}

.copy-button:hover {
   background-color: #2e004154;
}
</style>
