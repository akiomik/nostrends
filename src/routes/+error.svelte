<script>
  import { page } from '$app/stores';
</script>

<h1>Nostrends</h1>

<div class="alert variant-ghost-error">
  <div class="alert-message">
    <h2>Error</h2>
    <p>{$page.error?.message}</p>
  </div>
</div>
