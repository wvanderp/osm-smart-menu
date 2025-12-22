<script>
  import Browser from "webextension-polyfill";
</script>

<span
  role="link"
  tabindex="0"
  style="--i18n-align:{Browser.i18n.getMessage('@@bidi_end_edge')}"
  onclick={() => Browser.runtime.openOptionsPage()}
  onkeydown={(e) => {
    if (e.key === "Enter" || e.key === " ") Browser.runtime.openOptionsPage();
  }}
>
  {Browser.i18n.getMessage("configurationLink")}
</span>

<style>
  span {
    text-transform: lowercase;
    text-align: var(--i18n-align);
    display: block;
    cursor: pointer;
    font-size: smaller;
    background-color: #f0f0f0;
  }
</style>
