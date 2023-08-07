export const ISODateToTimestampWithoutMili = (ISOString: Date) => {
  const date = new Date(ISOString);
  return Math.floor(date.getTime() / 1000);
}

export const convertDateToISO8601 = (inputDate: string) => {
  const [year, month, day] = inputDate.split('-');

  const dateObject = new Date(`${year}-${month}-${day}T00:00:00Z`);

  return dateObject.toISOString();
}