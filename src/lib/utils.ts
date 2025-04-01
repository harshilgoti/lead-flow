import { clsx, type ClassValue } from "clsx";
import { sha256 } from "@noble/hashes/sha256";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashPassword(password: string) {
  return Buffer.from(sha256(password)).toString("hex");
}

export const LeadSource = [
  {
    label: "SEO",
    value: "SEO",
  },
  {
    label: "Social Media",
    value: "social_media",
  },
  {
    label: "Email Marketing",
    value: "email_marketing",
  },
  {
    label: "Content Marketing",
    value: "content_marketing",
  },
  {
    label: "Virtual Events",
    value: "virtual_events",
  },
  {
    label: "Website",
    value: "website",
  },
  {
    label: "Backlinks",
    value: "backlinks",
  },
];

export const LeadStatus = [
  {
    label: "Contacted",
    value: "contacted",
  },
  {
    label: "Follow-up scheduled",
    value: "follow-up_scheduled",
  },
  {
    label: "Interested",
    value: "interested",
  },
  {
    label: "Not interested",
    value: "not_interested",
  },
  {
    label: "Virtual Events",
    value: "virtual_events",
  },
  {
    label: "Re-attempt",
    value: "re_attempt",
  },
  {
    label: "NDA signed",
    value: "NDA_signed",
  },
  {
    label: "Code review",
    value: "code_review",
  },
  {
    label: "Waiting for response",
    value: "waiting_for_response",
  },
  {
    label: "Proposal sent",
    value: "proposal_sent",
  },
  {
    label: "Proposal approved",
    value: "proposal_approved",
  },
  {
    label: "Done",
    value: "done",
  },
  {
    label: "Proposal rejected",
    value: "proposal_rejected",
  },
  {
    label: "Closed",
    value: "closed",
  },
  {
    label: "In negotiation",
    value: "in_negotiation",
  },
];
