export const getReleaseYear = (dateString: string | undefined): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const year = date.getFullYear();
  
  return isNaN(year) ? dateString.substring(0, 4) : year.toString();
};