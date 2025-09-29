// app/api/logout/route.ts
import { cookies } from "next/headers";

export async function POST() {
  // Cookie remove
  (await cookies()).delete("FFT");

  return Response.json({ success: true });
}
