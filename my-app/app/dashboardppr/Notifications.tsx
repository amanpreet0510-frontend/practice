export const dynamic = "force-dynamic";

export default async function Notifications() {
  await new Promise((r) => setTimeout(r, 5000)); // simulate slow fetch

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        <li>New user registered</li>
        <li>Server backup completed</li>
      </ul>
    </div>
  );
}
