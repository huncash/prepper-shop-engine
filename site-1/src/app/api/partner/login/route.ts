import { handlePartnerLogin } from "@shared/auth/partner-handlers";

export async function POST(request: Request) {
  return handlePartnerLogin(request);
}
