export function formatDate(isoString, locale = 'ru-RU') {
  const date = new Date(isoString);

  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}