export const ISODateToTimestampWithoutMili = (ISOString: Date) => {
  const date = new Date(ISOString);
  return Math.floor(date.getTime() / 1000);
}