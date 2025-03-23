const fields = foundry.data.fields;

const stats = new fields.SchemaField({
  st: new fields.SchemaField({
    max: new fields.NumberField({ integer: true }),
    value: new fields.NumberField({ integer: true }),
    multiplier: new fields.NumberField({ integer: true, initial: 1 }),
    derivedTN: new fields.StringField({ initial: "phys", readonly: true }),
  }),
  ma: new fields.SchemaField({
    max: new fields.NumberField({ integer: true }),
    value: new fields.NumberField({ integer: true }),
    multiplier: new fields.NumberField({ integer: true, initial: 1 }),
    derivedTN: new fields.StringField({ initial: "mag", readonly: true }),
  }),
  vi: new fields.SchemaField({
    max: new fields.NumberField({ integer: true }),
    value: new fields.NumberField({ integer: true }),
    multiplier: new fields.NumberField({ integer: true, initial: 1 }),
    derivedTN: new fields.StringField({ initial: "save", readonly: true }),
  }),
  ag: new fields.SchemaField({
    max: new fields.NumberField({ integer: true }),
    value: new fields.NumberField({ integer: true }),
    multiplier: new fields.NumberField({ integer: true, initial: 1 }),
    derivedTN: new fields.StringField({ initial: "dodge", readonly: true }),
  }),
  lu: new fields.SchemaField({
    max: new fields.NumberField({ integer: true }),
    value: new fields.NumberField({ integer: true }),
    multiplier: new fields.NumberField({ integer: true, initial: 1 }),
    derivedTN: new fields.StringField({
      initial: "negotiation",
      readonly: true,
    }),
  }),
});

const schema = {
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
  stats,
  notes: new fields.HTMLField(),
} as const;

export class SmtBaseActorData extends foundry.abstract.TypeDataModel<
  typeof schema,
  Actor
> {
  static override defineSchema() {
    return schema;
  }
}
