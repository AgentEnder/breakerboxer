export function basename(path: string, extension?: string) {
  const parts = path.split('/');
  extension.replace('.', '\\.');
  return parts[parts.length - 1].replace(new RegExp(`${extension}$`), '');
}
