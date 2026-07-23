import { handlePartnerRegister } from "@shared/auth/partner-handlers";

export async function POST(request: Request) {
  return handlePartnerRegister(request);
}
