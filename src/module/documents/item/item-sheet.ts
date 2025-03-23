export default class SmtItemSheet extends ItemSheet {
  static override get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["smt-ts-test", "sheet", "item"],
      width: 800,
      height: 600,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "effect",
        },
      ],
    });
  }

  override get template() {
    const basePath = "systems/smt-ts-test/templates/item";

    return `${basePath}/item-${this.item.type}-sheet.hbs`;
  }

  override async getData() {
    const context = await super.getData();
    const system = this.item.system;

    foundry.utils.mergeObject(context, {
      system,
      SMT: CONFIG.SMT,
    });

    return context;
  }

  override activateListeners(html: JQuery<HTMLElement>) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;
  }
}
