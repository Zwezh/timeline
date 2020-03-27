interface Date {
  getStringDate(): string;
}

Date.prototype.getStringDate = function () {
  const year = this.getFullYear();
  let month = (this.getMonth() + 1).toString();
  let date = this.getDate().toString();

  if (month < 10) {
    month = '0' + month;
  }

  if (date < 10) {
    date = '0' + date;
  }

  const result = year + '-' + month + '-' + date;
  return result;
};