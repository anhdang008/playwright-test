import { BasePage } from './basePage';

export class TimeIsPage extends BasePage {
  readonly SEARCH_INPUT = 'input[id="q"]';
  readonly BODY = 'body';
  readonly DATE_PATTERN = /(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}(?:st|nd|rd|th)?,?\s*\d{4}|\d{1,2}\/\d{1,2}\/\d{4}|today|tomorrow|yesterday/i;
  readonly TIME_PATTERN = /\d{1,2}:\d{2}:\d{2}/;

  async goto(url: string): Promise<void> {
    await this.visit(url);
  }

  async getPageText(): Promise<string> {
    return await this.text(this.BODY);
  }

  async assertPageTitledDisplayed(title: string): Promise<void> {
     await this.assertTextVisible(this.BODY, title);
  }

  async searchCity(city: string): Promise<void> {
    await this.waitForVisible(this.SEARCH_INPUT);
    await this.click(this.SEARCH_INPUT, 'Search input');
    await this.fill(this.SEARCH_INPUT, city, 'City search');
    await this.locator(this.SEARCH_INPUT).press('Enter');
  }

  async assertCityDisplayed(city: string): Promise<void> {
    await this.assertTextVisible(this.BODY, city);
  }

  async assertDateDisplayed(): Promise<void> {
    const text = await this.getPageText();
    if (!this.DATE_PATTERN.test(text)) {
      throw new Error('Date is not displayed in expected formats');
    }
  }

  async assertTimeFormatPresent(): Promise<void> {
    const text = await this.getPageText();
    if (!this.TIME_PATTERN.test(text)) {
      throw new Error('Time format HH:MM:SS is not found');
    }
  }

  async assertTimeIsUpdating(): Promise<void> {
    const firstText = await this.getPageText();
    const firstMatch = firstText.match(this.TIME_PATTERN);
    if (!firstMatch) {
      throw new Error('Time is not found on the page');
    }

    const firstSeconds = Number(firstMatch[0].split(':')[2]);
    await this.wait(1500);

    const secondText = await this.getPageText();
    const secondMatch = secondText.match(this.TIME_PATTERN);
    if (!secondMatch) {
      throw new Error('Time is not found on the page');
    }

    const secondSeconds = Number(secondMatch[0].split(':')[2]);
    const difference = secondSeconds - firstSeconds;
    if (!(difference > 0 || (firstSeconds > 50 && secondSeconds < 10))) {
      throw new Error('Time is not updating');
    }
  }
}
