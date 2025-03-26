export class SmtActor extends Actor<"character"> {
  get level() {
    return this.system.lv;
  }
}
