// // app/no-ppr-test/page.tsx

// import DynamicSection from "../ppr-test/DynamicSection";

// export default async function Page() {
//   // ❗ Entire page waits for DynamicSection before showing anything
//   const dynamicContent = await DynamicSection();

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>No PPR Test Page</h1>
//       <p>This page will NOT load instantly.</p>

//       {dynamicContent}
//     </div>
//   );
// }
