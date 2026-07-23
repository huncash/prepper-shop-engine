"use client";

import { PartnerAuthForm } from "@shared/components/PartnerAuthForm";

export default function PartnerRegisterPage() {
  return (
    <div className="flex min-h-[70vh] items-center px-4 py-12">
      <PartnerAuthForm mode="register" onSuccessRedirect="/katalogus" />
    </div>
  );
}
