import { SMT } from "./config/config";

declare global {
  interface CONFIG {
    SMT: typeof SMT;
  }
}

Hooks.once("init", () => {
  console.log("SMT-TS | Initializing SMT-TS");

  // Global configuration
  CONFIG.ActiveEffect.legacyTransferral = false;
  CONFIG.SMT = SMT;
});
