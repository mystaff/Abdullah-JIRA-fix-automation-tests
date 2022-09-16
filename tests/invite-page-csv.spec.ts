import { test, expect } from "@playwright/test";
import { updateCSV } from "../csv-update/update-csv";

test.beforeAll(async () => await updateCSV());

test("It navigates to the login page and logs in with username and password", async ({
  page,
}) => {
  await page.goto(
    "https://2.timedoctor.com/invite?api=https:%2F%2Fapi-984.sandbox.timedoctor.com",
    { waitUntil: "domcontentloaded" }
  );
  const loginForm = page.locator("mat-form-field");
  await loginForm
    .locator(`input[type="email"]`)
    .type("krishna+984@timedoctor.com");
  await loginForm.locator(`input[type="password"]`).type("Pass123#");
  await page.locator("button :text('SIGN IN')").click();
  await page.locator("div.page-base div.row-text").first().waitFor();
  await page.locator("div.page-base div.row-text").first().click();
  await page.locator("button.company-button").click();
  const subCompanies = page.locator("div.mat-menu-panel button");

  for (
    let subCompanyInd = 0;
    subCompanyInd < (await subCompanies.count());
    subCompanyInd++
  ) {
    await subCompanies.nth(subCompanyInd).click();
    await page.locator("div :text('ADD BY CSV')").click();
    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),
      page.locator("text=Upload csv file").click(),
    ]);
    await fileChooser.setFiles("csv_users.csv");
    await page.locator("mat-checkbox :text('Group 1')").check();
    await page.locator("mat-checkbox :text('Test Project')").check();
    await page.locator("button :text('ADD USERS')").click();
    await page
      .locator(
        "text=Users successfully added. You'll need to install the tracking app on their computers and provide their login credentials to them"
      )
      .waitFor({ state: "visible" });
    await page.locator("button.company-button").click();
  }
});
