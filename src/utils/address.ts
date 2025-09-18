import type { Address } from '@/shared/types';

export function formatAddress(address: Address): string {
  return `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`;
}
