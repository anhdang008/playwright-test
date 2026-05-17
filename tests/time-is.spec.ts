import { test } from '@playwright/test';
import { TimeIsPage } from '../pages/timeIsPage';
import { BasePage } from '../pages/basePage';
import { closeBrowser } from '../utilities/helpers/browserHelper';


test.describe('WEB Testing', () => {
  const url = 'https://time.is';

test('time.is: search for Los Angeles and verify time display', async ({ page },testInfo) => {
  const timePage = new TimeIsPage(page);
  const city = 'Los Angeles';
 
//   Step 1: Open https://time.is
  await timePage.goto(url);

//   take screenshort
  await timePage.attachScreenshot('open web success', testInfo);
//   Step 2: Search for a city (e.g. Los Angeles) using the site’s search feature
  await timePage.searchCity(city);
  
//   Step 3: Verify the city name is displayed correctly on the result page
  await timePage.assertCityDisplayed(city);

//   Step 4: Verify the current date is displayed
  await timePage.assertDateDisplayed();

//   Step 5: Verify the time display is present, formatted as HH:MM:SS, and is actively updating
  await timePage.assertTimeFormatPresent();
  await timePage.assertTimeIsUpdating();
})

});

// Take screenshot and close browser after each test
test.afterEach(async ({ page }, testInfo) => {
  const basePage = new BasePage(page);
  await basePage.attachScreenshot('after test', testInfo);
  await closeBrowser(page);
});
