import Browser from "webextension-polyfill";
import type { Runtime } from "webextension-polyfill";

export async function idempotentMigrations(
  _details: Runtime.OnInstalledDetailsType
): Promise<void> {
  await migrateLocalStorageToSyncStorage();
}

async function migrateLocalStorageToSyncStorage() {
  if (!Browser.storage.sync) return; // a safeguard for browsers that do not support storage.sync

  const localData = await Browser.storage.local.get();
  if (localData && Object.keys(localData).length > 0) {
    await Browser.storage.sync.set(localData);
    await Browser.storage.local.clear();
    console.log(
      "Data migrated from local storage to sync storage:",
      JSON.stringify(localData)
    );
  }
}
