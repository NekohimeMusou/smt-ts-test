import { SmtCharacterData } from "./data-models/actor/character.js";
import { SmtActorSheet } from "./documents/actor/actor-sheet.js";
import { SmtActor } from "./documents/actor/actor.js";

declare global {
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

Hooks.once("init", () => {
  console.log("SMT-TS | Initializing SMT-TS");

  // Global configuration
  CONFIG.ActiveEffect.legacyTransferral = false;
  game.smt = { SmtActor };

  registerDataModels();
  registerDocumentClasses();
  registerSheetApplications();
});

function registerDataModels() {
  CONFIG.Actor.dataModels = {
    character: SmtCharacterData,
  };
}

function registerDocumentClasses() {
  CONFIG.Actor.documentClass = SmtActor;
}

function registerSheetApplications() {
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("smt-ts-test", SmtActorSheet, {
    types: ["character"],
    makeDefault: true,
  });
}
