<template>
  <div class="loading-icon">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
  export default {
    name: 'LoadingIcon'
  }
</script>

<style scoped>
  .loading-icon {
    display: inline-block;
    position: relative;
    width: 3.2rem;
    height: 3.2rem;
  }
  
  .loading-icon div {
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    background: #ffffff;
    border-radius: 50%;
    animation: loading 1.2s linear infinite;
  }
  
  .loading-icon div:nth-child(1) {
    top: 0;
    left: 0;
    animation-delay: 0s;
  }
  
  .loading-icon div:nth-child(2) {
    top: 0;
    left: 1.2rem;
    animation-delay: -0.4s;
  }
  
  .loading-icon div:nth-child(3) {
    top: 0;
    left: 2.4rem;
    animation-delay: -0.8s;
  }
  
  .loading-icon div:nth-child(4) {
    top: 1.2rem;
    left: 0;
    animation-delay: -0.4s;
  }
  
  .loading-icon div:nth-child(5) {
    top: 1.2rem;
    left: 1.2rem;
    animation-delay: -0.8s;
  }
  
  .loading-icon div:nth-child(6) {
    top: 1.2rem;
    left: 2.4rem;
    animation-delay: -1.2s;
  }
  
  .loading-icon div:nth-child(7) {
    top: 2.4rem;
    left: 0;
    animation-delay: -0.8s;
  }
  
  .loading-icon div:nth-child(8) {
    top: 2.4rem;
    left: 1.2rem;
    animation-delay: -1.2s;
  }
  
  .loading-icon div:nth-child(9) {
    top: 2.4rem;
    left: 2.4rem;
    animation-delay: -1.6s;
  }
  
  @keyframes loading {
      0%, 100% {
          opacity: 1;
      }
      50% {
          opacity: 0.5;
      }
  }
</style>