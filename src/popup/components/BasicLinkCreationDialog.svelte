<script lang="ts">
  import Browser from "webextension-polyfill";
  import { CustomUserOption } from "../utils";
  import { addNewUrlPattern } from "../../storage/config-handler";
  import InfoBox from "./InfoBox.svelte";

  export let customUserOption: CustomUserOption | undefined;

  let optionCreated: boolean = false;

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
      <button on:click={buttonClick}>
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
