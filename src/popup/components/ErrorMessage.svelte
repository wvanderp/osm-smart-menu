<script lang="ts">
  import Browser from "webextension-polyfill";
  import { KnownError, openLink } from "../utils";
  import InfoBox from "./InfoBox.svelte";

  let { error }: { error: KnownError } = $props();

  const linkPlaceholder = "__LINK__";
  const errorMessage = $derived.by(() => {
    const text = Browser.i18n.getMessage(`error_${error}`, linkPlaceholder);
    const linkText = "jgpacker/osm-smart-menu";
    const [firstPart, lastPart] = text.split(linkPlaceholder);
    return {
      firstPart,
      linkText,
      linkHref: `https://github.com/${linkText}/blob/master/README.md#osm-smart-menu`,
      lastPart,
    };
  });
</script>

<InfoBox>
  {errorMessage.firstPart}
  <a
    href={errorMessage.linkHref}
    onclick={(e) => {
      e.preventDefault();
      openLink(errorMessage.linkHref);
    }}
  >
    {errorMessage.linkText}
  </a>
  {errorMessage.lastPart}
</InfoBox>
