<script lang="ts">
  import Browser from "webextension-polyfill";
  import type { CustomUserOption } from "../utils";
  import { addNewUrlPattern } from "../../storage/config-handler";
  import InfoBox from "./InfoBox.svelte";

  let { customUserOption }: { customUserOption: CustomUserOption | undefined } =
    $props();

  let optionCreated: boolean = $state(false);

  async function buttonClick() {
    if (customUserOption) {
      await addNewUrlPattern(
        customUserOption.defaultName,
        customUserOption.urlPattern
      );
      optionCreated = true;
    }
  }
</script>

{#if customUserOption}
  <InfoBox>
    {#if !optionCreated}
      {Browser.i18n.getMessage("newOptionDetected_notice")}
      <button onclick={buttonClick}>
        {Browser.i18n.getMessage("newOptionDetected_buttonText")}
      </button>
    {:else}{Browser.i18n.getMessage(
        "newOptionDetected_added",
        customUserOption && customUserOption.defaultName
      )}{/if}
  </InfoBox>
{/if}

<style>
  button {
    display: block;
    margin: 4px auto;
  }
</style>
