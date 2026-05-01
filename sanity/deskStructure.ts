import type { StructureResolver } from "sanity/structure";
import DeploySitePane from "./DeploySitePane";

const hospiceSingletons = [
] as const;

const mensShedDefaultJson = JSON.stringify(
  {
    pageTitle: "Men's Shed | Dove Cottage",
    heroImage: "/images/uploads/mens-shed-featured.png",
    heroImageAlt: "Men playing cards together in the Men's Shed support group",
    parentNavLabel: "Counselling & Support",
    parentNavHref: "/hospice-services/counselling-support/",
    heroH1: "Men's Shed",
    heroShortDescription: "A welcoming place for men to connect with others who understand.",
    whatHeading: "What Is A Men's Shed?",
    whatBody:
      "A Men's Shed is a physical space where a group of men can meet, organise and take part in social activities, and talk to others in a similar situation. At Dove Cottage Day Hospice, the Men's Shed extends the services we offer. Historically, hospices have struggled to reach men who are caring for, or living with, a life-limiting illness, or who may find themselves alone for the first time in their lives.",
    whoHeading: "Who Is It For?",
    whoList: [
      { text: "Living with a life-limiting illness" },
      { text: "Caring for someone living with a life-limiting illness" },
      { text: "Bereaved" },
      { text: "Anticipating bereavement" },
    ],
    helpHeading: "How Can The Men's Shed Help?",
    helpBody:
      "Regular attendance at the Men's Shed can help promote the mental and physical wellbeing of men, while supporting them to find and enjoy meaningful relationships and connections.",
    benefitsHeading: "What Are The Benefits?",
    benefitsList: [
      { text: "Accessing a safe space to talk with others experiencing similar situations" },
      { text: "Reducing social isolation through companionship and camaraderie" },
      { text: "Engaging in new interests and hobbies" },
      { text: "Accessing support and advice" },
    ],
    attendanceBody:
      "Although the group will run weekly, there is no expectation to attend every week - members are welcome to come when it suits them.",
    locationBody:
      "Our Men's Shed will take place in our hospice building, with the opportunity to use the extensive hospice garden area.",
    quoteText:
      "\"It's something I can look forward to on a weekly basis and I know that I'm in a situation where we are all in the same boat.\"",
    quoteAttribution: "An attendee at a Marie Curie Men's Shed",
    referralIntro:
      "Dates and times will be announced as soon as they are confirmed. To register your interest and be the first to hear, please complete the",
    referralCta: "enquiry form",
    referralCtaHref: "/contact/",
    referralOutro: ".",
    sideFormLinkText: "Use our contact form",
    sideFormHint: "Register your interest in the Men's Shed group.",
  },
  null,
  2
);

const bereavementSupportGroupDefaultJson = JSON.stringify(
  {
    pageTitle: "Bereavement Support Group | Dove Cottage",
    heroImage: "/images/uploads/bereavement/bereavement-support-group-featured.png",
    heroImageAlt:
      "A guest and staff member sharing a supportive fist bump during a group session",
    parentNavLabel: "Counselling & Support",
    parentNavHref: "/hospice-services/counselling-support/",
    heroH1: "Bereavement Support Group",
    heroShortDescription: "It's Good To Talk.",
    mainIntro1:
      "Our bereavement support group is accessible by any individual within our community that has been affected by a bereavement.",
    mainIntro2:
      "The group is led by fully-trained volunteers and offers a safe, friendly and relaxed space to connect with others who find themselves in similar situations.",
    mainIntro3:
      "The free drop-in sessions will take place in our hospice building with tea, coffee and biscuits available.",
    groupHeading: "Bereavement Support Group",
    groupBullets: [
      { text: "Open to anyone who is bereaved, at any stage" },
      { text: "A relaxed, supportive space to share experiences or simply listen" },
      { text: "No referral or booking required" },
    ],
    detailsFoot:
      "This is a brand new service that will launch soon. Dates and times of the groups will be listed below as soon as they are confirmed.",
    registerInterestIntro: "To register your interest, please complete the",
    registerInterestCta: "enquiry form",
    registerInterestHref: "#bereavement-enquiry-form",
    registerInterestOutro:
      "and one of our team will be in touch as soon as we have more details.",
    sideFormLinkText: "Use our contact form",
    sideFormHint: "Register your interest in the bereavement support group.",
    sectionImage1: {
      src: "/images/uploads/bereavement/bereavement-support-group-featured.png",
      alt: "A guest and staff member sharing a supportive fist bump during a group session",
    },
    beaconAccount: "dovecottagedayhospice",
    beaconFormId: "fe636194",
  },
  null,
  2
);

const carerSupportGroupDefaultJson = JSON.stringify(
  {
    pageTitle: "Carer Support Group | Dove Cottage",
    heroImage: "/images/uploads/carer-support-featured.png",
    heroImageAlt: "Two people chatting and laughing during a support group activity",
    parentNavLabel: "Support Groups",
    parentNavHref: "/hospice-services/support-groups/",
    heroH1: "Carer Support Group",
    heroShortDescription: "Ensuring Carers Receive The Support They Deserve.",
    mainIntro1:
      "Being a carer for a loved one is tough. We get it. Putting someone else's needs before your own has become your everyday, and sometimes it might feel like you've forgotten who you were before.",
    mainIntro2:
      "But that's why we're here - to support as many carers as possible and help them enjoy some time of their own.",
    sectionImage1: {
      src: "/images/uploads/carer-support-featured.png",
      alt: "Two people chatting and laughing during a support group activity",
    },
    whoHeading: "Who Is It For?",
    whoList: [
      { text: "Anyone supporting or caring for someone with a palliative condition" },
      { text: "Anyone living with a palliative condition themselves" },
    ],
    helpHeading: "How Can It Help?",
    helpList: [
      { text: "An informal group offering connection and peer support" },
      { text: "Signposting to other support if required" },
      { text: "Making connections with others in similar situations" },
    ],
    detailsFoot: "More details of dates and times will be confirmed soon.",
    registerInterestIntro: "Please complete this",
    registerInterestCta: "enquiry form",
    registerInterestHref: "/contact/",
    registerInterestOutro: "to register your interest.",
    sideFormLinkText: "Use our contact form",
    sideFormHint: "Register your interest in the carer support group.",
  },
  null,
  2
);

function singletonEditorItem(
  S: Parameters<StructureResolver>[0],
  {
    title,
    pageKey,
    jsonData,
  }: { title: string; pageKey: string; jsonData?: string }
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
            ...(jsonData ? { jsonData } : {}),
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
            singletonEditorItem(S, {
              title: "Men's Shed",
              pageKey: "mens_shed",
              jsonData: mensShedDefaultJson,
            }),
            singletonEditorItem(S, {
              title: "Bereavement Support Group",
              pageKey: "bereavement_support_group",
              jsonData: bereavementSupportGroupDefaultJson,
            }),
            singletonEditorItem(S, {
              title: "Carer Support Group",
              pageKey: "carer_support_group",
              jsonData: carerSupportGroupDefaultJson,
            }),
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
