<script lang="ts">
  import Browser from "webextension-polyfill";
  import type { SiteLink } from "../sites-manipulation-helper";
  import { openLink } from "../utils";
  import InfoBox from "./InfoBox.svelte";

  let { siteLinks }: { siteLinks: SiteLink[] } = $props();
</script>

{#each siteLinks as site}
  <a
    id={site.id}
    href={site.url}
    class="site"
    onclick={(e) => {
      e.preventDefault();
      openLink(site.url);
    }}
  >
    {site.customName || Browser.i18n.getMessage(`site_${site.id}`) || "???"}
  </a>
{:else}
  <InfoBox>{Browser.i18n.getMessage("noEnabledCompatibleLinksFound")}</InfoBox>
{/each}

<style>
  .site {
    padding: 4px 16px;
    display: block;
    white-space: nowrap;
    text-decoration: inherit;
    color: inherit;
  }

  .site:hover {
    background-color: rgba(51, 7, 7, 0.08);
  }

  .site:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
</style>
