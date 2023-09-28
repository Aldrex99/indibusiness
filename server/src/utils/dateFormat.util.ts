export const ISODateToTimestampWithoutMili = (ISOString: Date) => {
  const date = new Date(ISOString);
  return Math.floor(date.getTime() / 1000);
}

export const convertDateToISO8601 = (inputDate: string) => {
  const [year, month, day] = inputDate.split('-');

  const dateObject = new Date(`${year}-${month}-${day}T00:00:00Z`);

  return dateObject.toISOString();
}

export const convertISO8601ToSlashDate = (ISOString: string) => {
  const date = new Date(ISOString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (month < 10) {
    if (day < 10) {
      return `0${day}/0${month}/${year}`;
    }
    return `${day}/0${month}/${year}`;
  }

  return `${day}/${month}/${year}`;
}