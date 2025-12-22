import Browser from "webextension-polyfill";
import { Sites } from "./sites-configuration";
import type { OsmAttribute } from "./sites-configuration";

Browser.runtime.onMessage.addListener(
  async (message: unknown): Promise<ContentScriptOutputMessage> => {
    const typedMessage = message as ContentScriptInputMessage;
    return typedMessage.candidateSiteIds.length !== 0
      ? typedMessage.candidateSiteIds.map(extractData)
      : [lookForPermalink()]; // helps to get parameters from unknown websites
  }
);

export type ContentScriptOutputMessage = ExtractedData[];

export type ContentScriptInputMessage = {
  candidateSiteIds: string[];
};

type ExtractedData = {
  siteId?: string;
  permalink?: string;
  additionalAttributes?: Partial<Record<OsmAttribute, string>>;
};

function extractData(siteId: string): ExtractedData {
  const site = Sites[siteId];
  if (!site) {
    // custom user sites are not in the `Sites` object
    return {
      siteId,
      ...lookForPermalink(),
    };
  }
  const extr = site.extractors;
  if (extr) {
    const permalink = extr.getPermalink && extr.getPermalink(document);
    const additionalAttributes =
      extr.getAttributesFromPage && extr.getAttributesFromPage(window);
    return { siteId, permalink, additionalAttributes };
  } else {
    return { siteId };
  }
}

function lookForPermalink(): ExtractedData {
  let permalink: Element | null | undefined =
    document.querySelector("[id*=permalink i]") ||
    document.querySelector("[class*=permalink i]");
  if (permalink && !(permalink instanceof HTMLAnchorElement)) {
    permalink = permalink.querySelector("a");
  }
  if (!permalink) {
    permalink = [...document.querySelectorAll("a")].find((a) =>
      /permalink/i.test(a.textContent || "")
    );
  }

  let url: string;
  if (permalink && permalink instanceof HTMLAnchorElement) {
    url = permalink.href;
  } else {
    url = window.document.location.href;
  }

  return {
    permalink: url,
  };
}
