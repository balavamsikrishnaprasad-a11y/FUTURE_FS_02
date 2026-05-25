// SQLite Lead Model
class Lead {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.source = data.source;
    this.status = data.status || "new";
    this.notes = data.notes || "";
  }
}

module.exports = Lead;