import { use } from "react";

type Photo = { id: number; title: string };

async function getPhoto(id: number): Promise<Photo> {
  // Random delay simulate (0.5 - 2.5s)
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 2000 + 500)
  );

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/photos/${id}`,
    { next: { revalidate: 10 } }
  );

  return res.json();
}

export default function PhotoItem({ id }: { id: number }) {
  const data = use(getPhoto(id));
  return (
    <div style={{ border: "1px solid gray", margin: "5px", padding: "5px" }}>
      <h3>{data.id} - {data.title}</h3>
    </div>
  );
}
