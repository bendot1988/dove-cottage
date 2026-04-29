import { createClient } from "@sanity/client";
import ourCorporatePartners from "../src/data/our-corporate-partners.json" with { type: "json" };
import fundraiseForUs from "../src/data/fundraise-for-us.json" with { type: "json" };
import volunteerYourTime from "../src/data/volunteer-your-time.json" with { type: "json" };
import meetTheTeam from "../src/data/meet-the-team.json" with { type: "json" };

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  throw new Error("Missing SANITY_AUTH_TOKEN. Run with: npx sanity exec ... --with-user-token");
}

const client = createClient({
  projectId: "juhj0d5o",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token,
});

await client.createOrReplace({
  _id: "ourCorporatePartnersPage.main",
  _type: "ourCorporatePartnersPage",
  ...ourCorporatePartners,
});

await client.createOrReplace({
  _id: "fundraiseForUsPage.main",
  _type: "fundraiseForUsPage",
  ...fundraiseForUs,
});

await client.createOrReplace({
  _id: "volunteerYourTimePage.main",
  _type: "volunteerYourTimePage",
  ...volunteerYourTime,
});

await client.createOrReplace({
  _id: "meetTheTeamPage.main",
  _type: "meetTheTeamPage",
  pageTitle: meetTheTeam.pageTitle,
  metaDescription: meetTheTeam.metaDescription,
  heroImage: meetTheTeam.heroImage,
  heroImageAlt: meetTheTeam.heroImageAlt,
  parentNavLabel: meetTheTeam.parentNavLabel,
  parentNavHref: meetTheTeam.parentNavHref,
  heroH1: meetTheTeam.heroH1,
  heroShortDescription: meetTheTeam.heroShortDescription,
  teamGroups: meetTheTeam.teamGroups,
  stats: meetTheTeam.stats,
  testimonials: meetTheTeam.testimonials,
});

console.log(
  "Seeded: ourCorporatePartnersPage.main, fundraiseForUsPage.main, volunteerYourTimePage.main, meetTheTeamPage.main",
);
