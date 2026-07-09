import { COMPANY_INFO } from "@shared/config/company-data";
import { AszfTemplate } from "@shared/templates/ASZF-template";

export default function AszfPage() {
  return (
    <AszfTemplate
      companyInfo={COMPANY_INFO}
      siteSpecificInfo={{
        siteName: "Prepper Shop 2",
        siteUrl: "https://shop2.example.com",
        activityDescription:
          "Túlélési és vészhelyzeti felszerelések, eszközök és kellékek online értékesítése.",
      }}
    />
  );
}
