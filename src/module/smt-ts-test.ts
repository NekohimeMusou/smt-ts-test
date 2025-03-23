import { SMT } from "./config/config.js";
import { templatePaths } from "./config/templates.js";
import { SmtCharacterData } from "./data-models/character.js";
import { SmtItemData } from "./data-models/inventoryItem.js";
import SmtActorSheet from "./documents/actor/actor-sheet.js";
import { SmtActor } from "./documents/actor/actor.js";
import SmtItemSheet from "./documents/item/item-sheet.js";
import { SmtItem } from "./documents/item/item.js";

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

export function getGame(): ReadyGame {
  if (game instanceof Game && game.ready) {
    return game;
  }

  throw new Error("game not initialized yet!");
}

Hooks.once("init", async () => {
  console.log("SMT-TS | Initializing SMT-TS");

  // Global configuration
  CONFIG.ActiveEffect.legacyTransferral = false;
  CONFIG.SMT = SMT;
  game.smt = { SmtActor };

  registerDataModels();
  registerDocumentClasses();
  registerSheetApplications();
  await preloadHandlebarsTemplates();
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

function registerSheetApplications() {
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("smt-ts-test", SmtActorSheet, {
    types: ["character"],
    makeDefault: true,
  });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("smt-ts-test", SmtItemSheet, {
    types: ["inventoryItem"],
    makeDefault: true,
  });
}

async function preloadHandlebarsTemplates() {
  await loadTemplates(templatePaths);
}
