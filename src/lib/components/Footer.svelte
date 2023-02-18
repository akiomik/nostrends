<script lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faGithub } from '@fortawesome/free-brands-svg-icons';
  import { faBolt } from '@fortawesome/free-solid-svg-icons';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<div class="p-8 flex justify-center">
  <ul class="list-none">
    <li class="inline after:content-['・'] after:text-surface-300">&copy; 2023 Nostrends</li>
    <li class="inline after:content-['・'] after:text-surface-300">
      <ExternalLink href="https://github.com/akiomik/nostrends" class="unstyled">
        <FontAwesomeIcon icon={faGithub} title="Open our Github repository" />
      </ExternalLink>
    </li>
    <li class="inline">
      <ExternalLink href="lightning:akiomik@stacker.news" class="unstyled">
        <FontAwesomeIcon icon={faBolt} title="Open our Lightning Address" />
      </ExternalLink>
    </li>
  </ul>
</div>
