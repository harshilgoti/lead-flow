import { LeadStatus } from "@/lib/utils";
import { sha256 } from "@noble/hashes/sha256";

export function hashPassword(password: string) {
  return Buffer.from(sha256(password)).toString("hex");
}

export const leadStatusObj = LeadStatus.reduce((acc, cur) => {
  return { ...acc, [cur.value]: cur.label };
}, {});
