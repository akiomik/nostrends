<script lang="ts">
  export let href: string;
  let className = '';
  export { className as class };
</script>

<a {href} rel="external noreferrer" target="_blank" class={className}>
  <slot />
</a>
