export const dynamic = "force-dynamic";

export default async function SalesChart() {
  await new Promise((r) => setTimeout(r, 3000)); 

  return (
    <div>
      <h2>Sales Chart</h2>
      <p>[Chart data loaded]</p>
    </div>
  );
}
