import type { StructureResolver } from "sanity/structure";
import DeploySitePane from "./DeploySitePane";

const hospiceSingletons = [
] as const;

function singletonEditorItem(
  S: Parameters<StructureResolver>[0],
  { title, pageKey }: { title: string; pageKey: string }
) {
  return S.listItem()
    .title(title)
    .child(
      S.documentList()
        .title(title)
        .schemaType("singletonPage")
        .filter('_type == "singletonPage" && pageKey == $pageKey')
        .params({ pageKey })
        .initialValueTemplates([
          S.initialValueTemplateItem("singletonPage", {
            pageKey,
            pageTitle: title,
          }),
        ])
    );
}

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("newsPost").title("News & Events"),
      S.documentTypeListItem("newsletterIssue").title("Newsletters"),
      S.listItem()
        .title("Homepage Page")
        .child(S.document().schemaType("homepagePage").documentId("homepagePage.main")),
      S.listItem()
        .title("Hire Our Facilities")
        .child(S.document().schemaType("hireOurFacilitiesPage").documentId("hireOurFacilitiesPage.main")),
      S.listItem()
        .title("About Us")
        .child(
          S.list().title("About Us").items([
            S.listItem()
              .title("Our Team")
              .child(S.document().schemaType("meetTheTeamPage").documentId("meetTheTeamPage.main")),
            S.listItem()
              .title("Our Facilities")
              .child(S.document().schemaType("ourFacilitiesPage").documentId("ourFacilitiesPage.main")),
          ])
        ),
      S.listItem()
        .title("Hospice Services")
        .child(
          S.list().title("Hospice Services").items([
            S.listItem()
              .title("Bereavement Support Group")
              .child(
                S.document().schemaType("bereavementSupportGroupPage").documentId("bereavementSupportGroupPage.main")
              ),
            S.listItem()
              .title("Nursing Care & Medical Advice")
              .child(
                S.document()
                  .schemaType("nursingCareMedicalAdvicePage")
                  .documentId("nursingCareMedicalAdvicePage.main")
              ),
            S.listItem()
              .title("Wellbeing Activities")
              .child(
                S.document().schemaType("wellbeingActivitiesPage").documentId("wellbeingActivitiesPage.main")
              ),
            S.listItem()
              .title("Complementary Therapies")
              .child(
                S.document().schemaType("complementaryTherapiesPage").documentId("complementaryTherapiesPage.main")
              ),
            S.listItem()
              .title("Therapy Bathing")
              .child(S.document().schemaType("therapyBathingPage").documentId("therapyBathingPage.main")),
            S.listItem()
              .title("Transport")
              .child(S.document().schemaType("transportPage").documentId("transportPage.main")),
            S.listItem()
              .title("Spiritual & Chaplaincy Support")
              .child(
                S.document().schemaType("spiritualChaplaincySupportPage").documentId("spiritualChaplaincySupportPage.main")
              ),
            ...hospiceSingletons.map((item) => singletonEditorItem(S, item)),
          ])
        ),
      S.listItem()
        .title("What We Offer")
        .child(
          S.list().title("What We Offer").items([
            S.listItem()
              .title("Hospice Services Overview")
              .child(
                S.document().schemaType("hospiceServicesOverviewPage").documentId("hospiceServicesOverviewPage.main")
              ),
            S.listItem()
              .title("Carer & Patient Wellbeing")
              .child(S.document().schemaType("carerPatientWellbeingPage").documentId("carerPatientWellbeingPage.main")),
            S.listItem()
              .title("Dementia Home Sitting")
              .child(S.document().schemaType("dementiaHomeSittingPage").documentId("dementiaHomeSittingPage.main")),
          ])
        ),
      S.listItem()
        .title("Support Groups")
        .child(
          S.list().title("Support Groups").items([
            S.listItem()
              .title("Support Groups Overview")
              .child(S.document().schemaType("supportGroupsPage").documentId("supportGroupsPage.main")),
            S.listItem()
              .title("Men's Shed")
              .child(S.document().schemaType("mensShedPage").documentId("mensShedPage.main")),
            S.listItem()
              .title("Bereavement Support Group")
              .child(
                S.document().schemaType("bereavementSupportGroupPage").documentId("bereavementSupportGroupPage.main")
              ),
            S.listItem()
              .title("Carer Support Group")
              .child(S.document().schemaType("carerSupportGroupPage").documentId("carerSupportGroupPage.main")),
          ])
        ),
      S.listItem()
        .title("Counselling & Support")
        .child(
          S.list().title("Counselling & Support").items([
            S.listItem()
              .title("Counselling & Support Overview")
              .child(
                S.document()
                  .schemaType("counsellingSupportOverviewPage")
                  .documentId("counsellingSupportOverviewPage.main")
              ),
            S.listItem()
              .title("Counselling")
              .child(S.document().schemaType("counsellingPage").documentId("counsellingPage.main")),
            S.listItem()
              .title("Bereavement Support")
              .child(S.document().schemaType("bereavementSupportPage").documentId("bereavementSupportPage.main")),
            S.listItem()
              .title("Resource Hub")
              .child(S.document().schemaType("resourceHubPage").documentId("resourceHubPage.main")),
          ])
        ),
      S.listItem()
        .title("Shops")
        .child(
          S.list().title("Shops").items([
            S.listItem()
              .title("Cotgrave Shop")
              .child(S.document().schemaType("cotgraveShopPage").documentId("cotgraveShopPage.main")),
            S.listItem()
              .title("Bottesford Shop")
              .child(S.document().schemaType("bottesfordShopPage").documentId("bottesfordShopPage.main")),
            S.listItem()
              .title("Stathern Shop")
              .child(S.document().schemaType("stathernShopPage").documentId("stathernShopPage.main")),
            S.listItem()
              .title("Asfordby Shop")
              .child(S.document().schemaType("asfordbyShopPage").documentId("asfordbyShopPage.main")),
            S.documentTypeListItem("shop").title("Other Shops (Legacy)"),
          ])
        ),
      S.listItem()
        .title("Support Us")
        .child(
          S.list().title("Support Us").items([
            S.listItem()
              .title("Make a Donation")
              .child(S.document().schemaType("makeDonationPage").documentId("makeDonationPage.main")),
            S.listItem()
              .title("Volunteer Your Time")
              .child(S.document().schemaType("volunteerYourTimePage").documentId("volunteerYourTimePage.main")),
            S.listItem()
              .title("Leave a Gift in Your Will")
              .child(S.document().schemaType("leaveGiftInWillPage").documentId("leaveGiftInWillPage.main")),
            S.listItem()
              .title("Fundraise for Us")
              .child(S.document().schemaType("fundraiseForUsPage").documentId("fundraiseForUsPage.main")),
            S.listItem()
              .title("Visit Our Shops (Overview)")
              .child(S.document().schemaType("shopsOverviewPage").documentId("shopsOverviewPage.main")),
            S.listItem()
              .title("Become a Corporate Partner")
              .child(
                S.document().schemaType("corporatePartnershipsPage").documentId("corporatePartnershipsPage.main")
              ),
            S.listItem()
              .title("Our Corporate Partners")
              .child(S.document().schemaType("ourCorporatePartnersPage").documentId("ourCorporatePartnersPage.main")),
            S.listItem()
              .title("Support Us Overview")
              .child(S.document().schemaType("supportUsOverviewPage").documentId("supportUsOverviewPage.main")),
          ])
        ),
      S.listItem().title("Deploy Site").child(S.component().title("Deploy Site").component(DeploySitePane)),
    ]);
