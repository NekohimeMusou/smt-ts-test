export default class SmtActorSheet extends ActorSheet {
  static override get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["smt-ts-test", "sheet", "actor"],
      template: "systems/smt-ts-test/templates/actor/actor-sheet.hbs",
      width: 850,
      height: 950,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "main",
        },
      ],
    });
  }

  override async getData() {
    const context = super.getData();
    const system = this.actor.system;
    const rollData = this.actor.getRollData();

    // Same issue here
    const test = system.lv;

    // Type of st is NumberField.InitializedType<{
    //     readonly integer: true;
    //     readonly min: 1;
    // }>
    const st = system.st;

    await foundry.utils.mergeObject(context, {
      system,
      rollData,
    });

    return context;
  }

  override activateListeners(html: JQuery<HTMLElement>) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;
  }
}
