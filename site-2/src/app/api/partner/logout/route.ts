import { handlePartnerLogout } from "@shared/auth/partner-handlers";

export async function POST() {
  return handlePartnerLogout();
}
