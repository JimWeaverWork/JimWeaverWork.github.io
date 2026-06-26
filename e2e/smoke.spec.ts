import { test, expect } from "@playwright/test";

test("homepage loads with the correct title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Jim Weaver/);
});

test("the app mounts and the loading splash is replaced", async ({ page }) => {
  await page.goto("/");

  // The #root element exists from index.html.
  const root = page.locator("#root");
  await expect(root).toBeVisible();

  // Once React mounts, the initial "Loading" splash should go away.
  await expect(page.locator("#splash")).toHaveCount(0);
});
