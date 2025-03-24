import { getGame } from "../../smt-ts-test.js";
import { SmtActor } from "../actor/actor.js";
import { SmtItem } from "../item/item.js";
import { SmtActiveEffect } from "./active-effect.js";

interface AECategory {
  type: "temporary" | "passive" | "inactive";
  label: string;
  effects: SmtActiveEffect[];
}

interface AECategories {
  temporary: AECategory;
  passive: AECategory;
  inactive: AECategory;
}

/**
 * Manage Active Effect instances through the Actor Sheet via effect control buttons.
 * @param {MouseEvent} event      The left-click event on the effect control
 * @param {Actor|Item} owner      The owning document which manages this effect
 */

export async function onManageActiveEffect(
  event: JQuery.ClickEvent,
  owner: SmtActor | SmtItem
) {
  event.preventDefault();
  const a = $(event.currentTarget);
  const li = a.closest("li");

  const effect = li.data("effectId")
    ? owner.effects.get(li.data("effectId") as string)
    : null;

  const actor = ["fiend", "human", "demon"].includes(owner.type)
    ? owner
    : owner.parent!;

  switch (a.data("action")) {
    case "create":
      // @ts-expect-error Bug in fvtt-types
      return await owner.createEmbeddedDocuments("ActiveEffect", [
        {
          name: getGame().i18n.localize("SMT.effects.newEffect"),
          icon: "icons/svg/aura.svg",
          origin: owner.uuid,
          duration: {
            rounds: li.data("effectType") === "temporary" ? 1 : undefined,
          },
          disabled: li.data("effectType") === "inactive",
        },
      ]);
    case "edit":
      return await effect?.sheet?.render(true);
    case "delete":
      // @ts-expect-error Bug in fvtt-types
      await owner.deleteEmbeddedDocuments("ActiveEffect", [effect?.id]);
      if (actor) await actor.sheet?.render(false);
      return;
    case "toggle":
      // @ts-expect-error Bug in fvtt-types
      await owner.updateEmbeddedDocuments("ActiveEffect", [
        { _id: effect?.id, disabled: !effect?.disabled },
      ]);
      if (actor) await actor.sheet?.render(false);
      return;
  }
} /**
 * Prepare the data structure for Active Effects which are currently applied to an Actor or Item.
 * @param {ActiveEffect[]} effects    The array of Active Effect instances to prepare sheet data for
 * @return {object}                   Data for rendering
 */

export function prepareActiveEffectCategories(
  effects: Collection<SmtActiveEffect>
): object {
  // Define effect header categories
  const categories: AECategories = {
    temporary: {
      type: "temporary",
      label: getGame().i18n.localize("SMT.effects.temporary"),
      effects: [],
    },
    passive: {
      type: "passive",
      label: getGame().i18n.localize("SMT.effects.passive"),
      effects: [],
    },
    inactive: {
      type: "inactive",
      label: getGame().i18n.localize("SMT.effects.inactive"),
      effects: [],
    },
  };

  // Iterate over active effects, classifying them into categories
  for (const e of effects) {
    if (e.disabled) categories.inactive.effects.push(e);
    else if (e.isTemporary) categories.temporary.effects.push(e);
    else categories.passive.effects.push(e);
  }
  return categories;
}
