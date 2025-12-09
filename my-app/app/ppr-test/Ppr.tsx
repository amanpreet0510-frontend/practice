// app/ppr-test/page.tsx
import { Suspense } from "react";
import DynamicSection from "./DynamicSection";

export const experimental_ppr = true; 

export default function Page() {
  return (
    <div style={{ padding: 20 }}>
      <h1>PPR Component Test</h1>
      <p>This static content loads instantly.</p>

      <Suspense fallback={<p>Loading dynamic part…</p>}>
        <DynamicSection />
      </Suspense>
    </div>
  );
}
