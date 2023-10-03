export const translateType = (type: string) => {
  switch (type) {
    case "quote":
      return "Devis";
    case "invoice":
      return "Facture";
    case "credit":
      return "Avoir";
    default:
      return "";
  }
}