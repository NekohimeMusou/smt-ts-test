import { SmtActor } from "../../documents/actor/actor.js";

const fields = foundry.data.fields;

const stats = new fields.SchemaField({
  st: new fields.SchemaField({
    base: new fields.NumberField({ integer: true, min: 1, initial: 1 }),
    lv: new fields.NumberField({ integer: true, min: 0, initial: 0 }),
    value: new fields.NumberField({ integer: true, min: 1 }),
  }),
  ma: new fields.SchemaField({
    base: new fields.NumberField({ integer: true, initial: 1, min: 1 }),
    lv: new fields.NumberField({ integer: true, min: 0, initial: 0 }),
    value: new fields.NumberField({ integer: true, min: 1 }),
  }),
  vi: new fields.SchemaField({
    base: new fields.NumberField({ integer: true, initial: 1, min: 1 }),
    lv: new fields.NumberField({ integer: true, min: 0, initial: 0 }),
    value: new fields.NumberField({ integer: true, min: 1 }),
  }),
  ag: new fields.SchemaField({
    base: new fields.NumberField({ integer: true, initial: 1, min: 1 }),
    lv: new fields.NumberField({ integer: true, min: 0, initial: 0 }),
    value: new fields.NumberField({ integer: true, min: 1 }),
  }),
  lu: new fields.SchemaField({
    base: new fields.NumberField({ integer: true, initial: 1, min: 1 }),
    lv: new fields.NumberField({ integer: true, min: 0, initial: 0 }),
    value: new fields.NumberField({ integer: true, min: 1 }),
  }),
});

const resources = {
  hp: new fields.SchemaField({
    max: new fields.NumberField({ integer: true }),
    value: new fields.NumberField({ integer: true }),
    multiplier: new fields.NumberField({
      integer: true,
      min: 1,
      initial: 1,
    }),
  }),
  mp: new fields.SchemaField({
    max: new fields.NumberField({ integer: true }),
    value: new fields.NumberField({ integer: true }),
    multiplier: new fields.NumberField({ integer: true, min: 1, initial: 1 }),
  }),
  fp: new fields.SchemaField({
    max: new fields.NumberField({ integer: true }),
    value: new fields.NumberField({ integer: true }),
  }),
};

const tn = new fields.SchemaField({
  st: new fields.NumberField({ integer: true }),
  ma: new fields.NumberField({ integer: true }),
  vi: new fields.NumberField({ integer: true }),
  ag: new fields.NumberField({ integer: true }),
  lu: new fields.NumberField({ integer: true }),
  phys: new fields.NumberField({ integer: true }),
  mag: new fields.NumberField({ integer: true }),
  save: new fields.NumberField({ integer: true }),
  dodge: new fields.NumberField({ integer: true }),
  negotiation: new fields.NumberField({ integer: true }),
  gun: new fields.NumberField({ integer: true }),
});

const power = new fields.SchemaField({
  phys: new fields.NumberField({ integer: true, min: 0 }),
  mag: new fields.NumberField({ integer: true, min: 0 }),
  gun: new fields.NumberField({ integer: true, min: 0 }),
});

const resist = new fields.SchemaField({
  phys: new fields.NumberField({ integer: true, min: 0 }),
  mag: new fields.NumberField({ integer: true, min: 0 }),
});

const bioData = {
  notes: new fields.HTMLField(),
};

const schema = {
  stats,
  ...resources,
  tn,
  power,
  resist,
  ...bioData,
  lv: new fields.NumberField({ integer: true, min: 1, initial: 1 }),
  macca: new fields.NumberField({ integer: true, min: 0 }),
} satisfies foundry.data.fields.DataSchema;

export abstract class SmtBaseActorData extends foundry.abstract.TypeDataModel<
  typeof schema,
  SmtActor
> {
  static override defineSchema() {
    return schema;
  }

  override prepareBaseData() {
    super.prepareBaseData();

    const stats = this.stats;

    for (const [key, stat] of Object.entries(stats)) {
      stat.value = (stat.base ?? 0) + (stat.lv ?? 0);
      const statName = key as CharacterStat;
    }

    const bob = this.macca;
  }
}
