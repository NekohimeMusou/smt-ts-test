import { SmtActor } from "../documents/actor/actor.js";

declare global {
  interface DocumentClassConfig {
    Actor: typeof SmtActor;
  }

  interface DataModelConfig {
    Actor: {
      character: typeof SmtCharacterData;
    };
  }
}

const fields = foundry.data.fields;

const characterSchema = {
  hp: new fields.SchemaField({
    max: new fields.NumberField({ integer: true }),
    value: new fields.NumberField({ integer: true }),
    multiplier: new fields.NumberField({ integer: true, initial: 1 }),
  }),
  mp: new fields.SchemaField({
    max: new fields.NumberField({ integer: true }),
    value: new fields.NumberField({ integer: true }),
    multiplier: new fields.NumberField({ integer: true, initial: 1 }),
  }),
  fp: new fields.SchemaField({
    max: new fields.NumberField({ integer: true }),
    value: new fields.NumberField({ integer: true }),
  }),
  stats: new fields.SchemaField({
    st: new fields.SchemaField({
      base: new fields.NumberField({ integer: true, initial: 1, min: 1 }),
      lv: new fields.NumberField({ integer: true, min: 0 }),
      mgt: new fields.NumberField({ integer: true, min: 0 }),
      value: new fields.NumberField({ integer: true, min: 1 }),
    }),
    ma: new fields.SchemaField({
      base: new fields.NumberField({ integer: true, initial: 1, min: 1 }),
      lv: new fields.NumberField({ integer: true, min: 0 }),
      mgt: new fields.NumberField({ integer: true, min: 0 }),
      value: new fields.NumberField({ integer: true, min: 1 }),
    }),
    vi: new fields.SchemaField({
      base: new fields.NumberField({ integer: true, initial: 1, min: 1 }),
      lv: new fields.NumberField({ integer: true, min: 0 }),
      mgt: new fields.NumberField({ integer: true, min: 0 }),
      value: new fields.NumberField({ integer: true, min: 1 }),
    }),
    ag: new fields.SchemaField({
      base: new fields.NumberField({ integer: true, initial: 1, min: 1 }),
      lv: new fields.NumberField({ integer: true, min: 0 }),
      mgt: new fields.NumberField({ integer: true, min: 0 }),
      value: new fields.NumberField({ integer: true, min: 1 }),
    }),
    lu: new fields.SchemaField({
      base: new fields.NumberField({ integer: true, initial: 1, min: 1 }),
      lv: new fields.NumberField({ integer: true, min: 0 }),
      mgt: new fields.NumberField({ integer: true, min: 0 }),
      value: new fields.NumberField({ integer: true, min: 1 }),
    }),
  }),
  notes: new fields.HTMLField(),
} satisfies foundry.data.fields.DataSchema;

export class SmtCharacterData extends foundry.abstract.TypeDataModel<
  typeof characterSchema,
  SmtActor
> {
  get st() {
    return this.stats.st.value;
  }

  get ma() {
    return this.stats.st.value;
  }

  get vi() {
    return this.stats.st.value;
  }

  get ag() {
    return this.stats.st.value;
  }

  get lu() {
    return this.stats.st.value;
  }

  static override defineSchema() {
    return characterSchema;
  }
}
