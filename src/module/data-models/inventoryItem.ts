import { SmtItem } from "../documents/item/item.js";

declare global {
  interface DocumentClassConfig {
    Item: typeof SmtItem;
  }

  interface DataModelConfig {
    Item: {
      inventoryItem: typeof SmtItemData;
    };
  }
}

const fields = foundry.data.fields;

const itemSchema = {
  description: new fields.HTMLField(),
} satisfies foundry.data.fields.DataSchema;

export class SmtItemData extends foundry.abstract.TypeDataModel<
  typeof itemSchema,
  SmtItem
> {
  static override defineSchema() {
    return itemSchema;
  }
}
