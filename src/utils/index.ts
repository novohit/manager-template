export function removePrefix(str: string, prefix: string) {
  if (str.startsWith(prefix)) {
    return str.replace(prefix, '');
  }
  return str;
}
