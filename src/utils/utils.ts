export function parseTagsAsString(tags: Record<string, string>) {
  let result = '';
  for (const [key, val] of Object.entries(tags)) {
    result += `${key}=${val} `;
  }
  return result;
}
