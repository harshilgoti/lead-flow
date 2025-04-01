"use client";
import { LeadSource, LeadStatus } from "@/lib/utils";
import { sha256 } from "@noble/hashes/sha256";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "query-string";

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

export const usePushQueryStrings = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pushQueryString = (
    params: { queryName: string; queryValue: string }[]
  ) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    params.map(({ queryName, queryValue }) =>
      currentParams.set(queryName, queryValue)
    );
    router.push(pathname + "?" + currentParams);
  };

  return pushQueryString;
};

export const useClearQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const clearQueryString = (queryNames?: string[]) => {
    // If queryNames is provided, exclude those query parameters from the searchParams
    if (queryNames && queryNames.length > 0) {
      const newPathname = qs.exclude(
        `${pathname}?${searchParams.toString()}`,
        queryNames
      );
      router.replace(newPathname);
      return;
    }
    // If no queryNames provided, clear all query parameters
    router.replace(pathname);
  };

  return clearQueryString;
};
