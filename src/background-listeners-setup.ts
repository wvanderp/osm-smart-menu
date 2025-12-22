import Browser from "webextension-polyfill";
import { idempotentMigrations } from "./storage/migrations";

Browser.runtime.onInstalled.addListener(idempotentMigrations);
