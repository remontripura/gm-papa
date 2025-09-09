export async function getData<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, options);
  if (!res.ok) {
    throw new Error("Something wrong");
  }
  const data = await res.json();
  return data as T;
}
// export async function getData<T>(endpoint: string, options?: RequestInit): Promise<T> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, options);
//   if (!res.ok) {
//     throw new Error("Something wrong");
//   }
//   const data = await res.json();
//   return data as T;
// }
