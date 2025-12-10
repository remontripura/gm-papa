import config from "@/config";

export async function getData<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${config.baseUrl}${endpoint}`, options);
  if (!res.ok) {
    throw new Error("Something wrong");
  }
  const data = await res.json();
  return data as T;
}
