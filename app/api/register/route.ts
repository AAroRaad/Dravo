import { NextResponse } from "next/server";

// Registration is handled via the /signup server action (lib/actions/auth-actions.ts).
// This route exists as a module placeholder to satisfy the Next.js type validator.
export async function POST() {
  return NextResponse.json({ message: "Use the /signup page to register." }, { status: 200 });
}
