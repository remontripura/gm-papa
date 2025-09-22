export async function getData<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
    options
  );
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


// import { cookies } from "next/headers";

// export async function getData<T>(
//   endpoint: string,
//   options: RequestInit = {}
// ): Promise<T> {
//   try {
//     const token = (await cookies()).get("GM_T")?.value;

//     const headers: HeadersInit = {
//       "Content-Type": "application/json",
//       ...(options.headers || {}),
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     };

//     const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
//     const res = await fetch(url, {
//       ...options,
//       headers,
//     });

//     // সবসময় text হিসেবে পড়ো (একবারই)
//     const text = await res.text();

//     let data: any;
//     try {
//       data = JSON.parse(text);
//     } catch {
//       data = { message: text };
//     }

//     // এখন status check করো
//     if (res.status === 401 || res.status === 403) {
//       return Promise.reject({
//         error: true,
//         status: res.status,
//         ...data,
//       });
//     }

//     if (!res.ok) {
//       return Promise.reject({
//         error: true,
//         status: res.status,
//         ...data,
//       });
//     }

//     return data as T;
//   } catch (error: any) {
//     console.error("getData error:", error);
//     throw new Error(error?.message || "Something went wrong while fetching data");
//   }
// }
