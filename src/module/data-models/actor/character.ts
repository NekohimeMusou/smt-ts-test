import { SmtActor } from "../../documents/actor/actor.js";

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
  stats: new fields.SchemaField({
    st: new fields.SchemaField({
      base: new fields.NumberField({ integer: true, initial: 1, min: 1 }),
      lv: new fields.NumberField({ integer: true, min: 0 }),
      mgt: new fields.NumberField({ integer: true, min: 0 }),
      value: new fields.NumberField({ integer: true, min: 1 }),
    }),
  }),
  lv: new fields.NumberField({ integer: true, min: 1, initial: 1 }),
  notes: new fields.HTMLField(),
};

export class SmtCharacterData extends foundry.abstract.TypeDataModel<
  typeof characterSchema,
  SmtActor
> {
  // Accessing the system object from e.g. the Actor or ActorSheet classes seems to
  // result in the same behavior
  get st() {
    /**
     * Mystery of the Missing Types
     */

    // Type of this.lv is `any`
    // Triggers eslint no-unsafe-assignment
    const level = this.lv;
    /**
     * Null or Undefined Schema Attributes
     */

    // Type of st is NumberField.InitializedType<{
    //     readonly integer: true;
    //     readonly min: 1;
    // }>
    // No error here
    const st = this.stats.st.value;
    // Type of stPlus is `number`
    // `this.stats.st.value`: "Object is possibly null or undefined"
    const stPlus = this.stats.st.value + 1;

    // No error here
    return this.stats.st.value;
  }

  static override defineSchema() {
    return characterSchema;
  }
}
