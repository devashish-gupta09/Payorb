import { useRouter } from "next/router";
import React from "react";

import Review from "../../src/components/Review";

/**
 * /review/
 */

export default function review() {
  const router = useRouter();
  console.log(router.query);
  return <Review />;
}
