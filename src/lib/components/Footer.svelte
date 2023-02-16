<script lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faGithub } from '@fortawesome/free-brands-svg-icons';
  import { faBolt } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="p-8 flex justify-center">
  <ul class="list-none">
    <li class="inline">&copy; 2023 Nostrends</li>
    <li class="inline select-none text-surface-300 cursor-default">・</li>
    <li class="inline">
      <a href="https://github.com/akiomik/nostrends" class="unstyled">
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </li>
    <li class="inline select-none text-surface-300 cursor-default">・</li>
    <li class="inline">
      <a href="lightning:humidnight79@walletofsatoshi.com" class="unstyled">
        <FontAwesomeIcon icon={faBolt} />
      </a>
    </li>
  </ul>
</div>
