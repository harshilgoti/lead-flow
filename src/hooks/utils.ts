"use client";
import { LeadSource, LeadStatus } from "@/lib/utils";
import { sha256 } from "@noble/hashes/sha256";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function hashPassword(password: string) {
  return Buffer.from(sha256(password)).toString("hex");
}

export const leadStatusObj = LeadStatus.reduce((acc, cur) => {
  return { ...acc, [cur.value]: cur.label };
}, {});

export const leadSourceObj = LeadSource.reduce((acc, cur) => {
  return { ...acc, [cur.value]: cur.label };
}, {});

export const useQueryString = () => {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (queryName: string, queryValue: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(queryName, queryValue);
      return params.toString();
    },
    [searchParams]
  );

  return createQueryString;
};

export const usePushQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useQueryString();

  const pushQueryString = (queryName: string, queryValue: string) => {
    router.push(pathname + "?" + createQueryString(queryName, queryValue));
  };

  return pushQueryString;
};
