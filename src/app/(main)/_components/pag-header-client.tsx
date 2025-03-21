"use client";

import { useEffect, useState } from "react";

export default function PageHeaderClient() {
  const [page, setPage] = useState(window.location.pathname);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pages = {
    "/": "Home",
    "/dashboard": "dashboard",
    "/users": "Users",
    "/leads": "Leads",
  };

  useEffect(() => {
    setPage(pages[window.location.pathname]);
  }, [pages, window.location.pathname]);

  return <>{page ?? "Home"}</>;
}
