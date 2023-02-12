<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Nostrends</title>
  <meta name="description" content="What's trending on Nostr?" />
  <meta name="keywords" content="nostr,trends,notes,damus,snort" />
  <head prefix="og: https://ogp.me/ns#">
    <meta property="og:locale" content="en_US" />
    <meta property="og:url" content="https://nostrends.vercel.app" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Nostrends" />
    <meta property="og:title" content="Nostrends" />
    <meta property="og:description" content="What's trending on Nostr?" />
  </head>
</svelte:head>

<h1>Nostrends</h1>

<div class="alert variant-ghost-error">
  <div class="alert-message">
    <h2>Error</h2>
    <p>{$page.error?.message}</p>
  </div>
</div>
