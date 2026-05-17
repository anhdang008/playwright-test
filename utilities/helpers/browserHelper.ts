import type { Page } from '@playwright/test';

export async function closeBrowser(page: Page): Promise<void> {
  const context = page.context();
  if (!context.isClosed()) {
    await context.close();
  }
}
