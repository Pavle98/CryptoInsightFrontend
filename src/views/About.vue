<template>
<div class="about-container">
    <h1>About Crypto Insight</h1>
    <div class="about-text">
        <p>Welcome to Crypto Insight, your trusted gateway to blockchain transaction insights. Our comprehensive tool offers you a detailed glimpse into the dynamic world of Ethereum transactions.</p>
        <h2>Transaction Table</h2>
        <p>Begin your journey with a transaction table featuring the latest Ethereum block's transactions. This initial overview presents the freshest transactions in the Ethereum network, equipping you with current insights.</p>
        <h2>Wallet Information</h2>
        <p>Seek a personalized touch? Enter a valid Ethereum wallet address in the designated text field. This will usher you to a detailed page tailored to that specific wallet, where you can:</p>
        <ul>
            <li>Review the wallet's current Ethereum balance</li>
            <li>Understand the USD equivalent of that Ethereum amount</li>
            <li>Monitor the wallet's USDT balance</li>
        </ul>
        <h2>Wallet Balance Graph</h2>
        <p>Visual learners, rejoice! Generate a vibrant graph showcasing the Ethereum and/or USDT balance trends for any chosen timeframe. This tool not only aids in comprehending asset trends but also offers a downloadable version for your records.</p>
        <h2>Historical Wallet Information</h2>
        <p>Dive deep into the past with our historical wallet feature. By selecting a specific date, discern the Ethereum and USDT balance as of that day, ensuring a thorough understanding of your assets' past behavior.</p>
        <h2>Transaction Search</h2>
        <p>Probe with precision using our robust transaction search capability. Delve into Ethereum, USDT, internal, and other token transactions by specifying a date or block range. An indispensable tool for those meticulous transaction traces.</p>
        <p>Your trust in Crypto Insight for transaction analysis and asset tracking is deeply appreciated. We remain dedicated to incessant refinement to better cater to your needs.</p>
    </div>
</div>
</template>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: rgba(19, 14, 22, 0.527); 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  color: #fffdfd;
  -webkit-text-stroke: 1px rgb(0, 0, 0);  
  font-weight: bold;
  padding: 0.5rem 1rem; 
  margin: 1rem 0; 
  border-radius: 8px;
}

h1 {
 
  margin-bottom: 1.5rem;
}

h2 {
  background-color: rgba(6, 51, 28, 0.3);  /* Light green for secondary headers */
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.about-text {
  font-size: 1.2rem;
  line-height: 1.6;
   -webkit-text-stroke: 0.1px black; 
  color: #fffdfd;
}

.about-text p {
  margin-bottom: 1rem;
}

.about-text ul {
  list-style-type: disc;
  margin-left: 2rem;
}

</style>
