import { SMT } from "./config/config";
import { SmtCharacterData } from "./data-models/character";
import { SmtItemData } from "./data-models/inventoryItem";
import { SmtActor } from "./documents/actor";
import { SmtItem } from "./documents/item";

declare global {
  interface CONFIG {
    SMT: typeof SMT;
  }

  interface Game {
    smt: {
      SmtActor: typeof SmtActor;
    };
  }
}

Hooks.once("init", () => {
  console.log("SMT-TS | Initializing SMT-TS");

  // Global configuration
  CONFIG.ActiveEffect.legacyTransferral = false;
  CONFIG.SMT = SMT;
  game.smt = { SmtActor };

  registerDataModels();
  registerDocumentClasses();
});

function registerDataModels() {
  CONFIG.Actor.dataModels = {
    character: SmtCharacterData,
  };

  CONFIG.Item.dataModels = {
    inventoryItem: SmtItemData,
  };
}

function registerDocumentClasses() {
  CONFIG.Actor.documentClass = SmtActor;
  CONFIG.Item.documentClass = SmtItem;
}