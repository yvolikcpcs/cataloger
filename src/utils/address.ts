import type { Address } from "@/types/address";

export function formatAddress(address: Address): string {
  return `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`;
}
