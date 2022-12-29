<template>
  <div>
    <p :class="status" role="alert" aria-live="assertive">
      {{ message[status] }}
    </p>
  </div>
</template>

<script>
  export default {
    name: 'ContactFormStatus',
    props: {
      status: String,
      message: Object
    }
  }
</script>

<style scoped>
  p {
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-width: 0;
    border-left-width: 0.3rem;
    border-style: solid;
  }
  
  .sending {
    background-color: rgb(var(--color-info-background));
    border-color: rgb(var(--color-info-border));
  }
  
  .success {
    background-color: rgb(var(--color-success-background));
    border-color: rgb(var(--color-success-border));
  }
  
  .warning {
    background-color: rgb(var(--color-warning-background));
    border-color: rgb(var(--color-warning-border));
  }
  
  .error {
    background-color: rgb(var(--color-error-background));
    border-color: rgb(var(--color-error-border));
  }
</style>