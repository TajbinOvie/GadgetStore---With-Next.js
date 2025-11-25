"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/login");
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) return <Loader />;

  return <>{children}</>;
}

