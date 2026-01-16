export function parseFullName(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const parts = fullName.trim().split(' ');
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' };
  }
  const firstName = parts[0];
  const lastName = parts.slice(1).join(' ');

  return { firstName, lastName };
}

export function parseDateOfBirth(dateStr: string): string {
  const [day, month, year] = dateStr.split('/');

  return `${year}-${month}-${day}`;
}
