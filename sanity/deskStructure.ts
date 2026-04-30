import type { StructureResolver } from "sanity/structure";

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
        .title("Hospice Services")
        .child(
          S.list().title("Hospice Services").items([
            S.listItem()
              .title("Hospice Services Overview")
              .child(
                S.document().schemaType("hospiceServicesOverviewPage").documentId("hospiceServicesOverviewPage.main")
              ),
            S.listItem()
              .title("Bereavement Support")
              .child(S.document().schemaType("bereavementSupportPage").documentId("bereavementSupportPage.main")),
            S.listItem()
              .title("Bereavement Support Group")
              .child(
                S.document().schemaType("bereavementSupportGroupPage").documentId("bereavementSupportGroupPage.main")
              ),
            S.listItem()
              .title("Counselling")
              .child(S.document().schemaType("counsellingPage").documentId("counsellingPage.main")),
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
            S.listItem()
              .title("Dementia Home Sitting")
              .child(S.document().schemaType("dementiaHomeSittingPage").documentId("dementiaHomeSittingPage.main")),
            S.listItem()
              .title("Counselling Support Overview")
              .child(
                S.document()
                  .schemaType("counsellingSupportOverviewPage")
                  .documentId("counsellingSupportOverviewPage.main")
              ),
            S.listItem()
              .title("Carer & Patient Wellbeing")
              .child(S.document().schemaType("carerPatientWellbeingPage").documentId("carerPatientWellbeingPage.main")),
            ...hospiceSingletons.map((item) => singletonEditorItem(S, item)),
          ])
        ),
      S.listItem()
        .title("Shops")
        .child(
          S.list().title("Shops").items([
            S.listItem()
              .title("Cotgrave Shop")
              .child(S.document().schemaType("cotgraveShopPage").documentId("cotgraveShopPage.main")),
            S.documentTypeListItem("shop").title("Other Shops (Legacy)"),
          ])
        ),
    ]);
