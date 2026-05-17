import { expect, Locator, Page, TestInfo } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  async click(selector: string, name = ''): Promise<void> {
     await this.locator(selector).click();
  }

  async fill(selector: string, text: string, name = ''): Promise<void> {
    await this.locator(selector).fill(text);
  }

  async text(selector: string): Promise<string> {
    return await this.locator(selector).innerText();
  }

  async assertTextVisible(selector: string, text: string): Promise<void> {
    await expect(this.locator(selector)).toContainText(text);
  }

  async waitForVisible(selector: string): Promise<void> {
    await this.locator(selector).waitFor({ state: 'visible' });
  }

  async wait(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  async attachScreenshot(name: string, testInfo: TestInfo): Promise<void> {
    const screenshot = await this.page.screenshot();
    await testInfo.attach(name, {
      body: screenshot,
      contentType: 'image/png',
    });
  }

  async attachResponseApi(responseBody: string, testInfo: TestInfo): Promise<void> {
    await testInfo.attach('api-response', {
    body: responseBody,
    contentType: 'application/json', // Hoặc 'text/plain'
  });
  }
}
