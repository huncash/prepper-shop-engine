import { COMPANY_INFO } from "@shared/config/company-data";
import { AszfTemplate } from "@shared/templates/ASZF-template";

export default function AszfPage() {
  return (
    <AszfTemplate
      companyInfo={COMPANY_INFO}
      siteSpecificInfo={{
        siteName: "Prepper Shop 3",
        siteUrl: "https://shop3.example.com",
        activityDescription:
          "Túlélési és vészhelyzeti felszerelések, eszközök és kellékek online értékesítése.",
      }}
    />
  );
}
