import { APIRequestContext, TestInfo } from '@playwright/test';

export class GitHubOrganizationService {
  private request: APIRequestContext;
  private testInfo: TestInfo;

  constructor(request: APIRequestContext, testInfo: TestInfo) {
    this.request = request;
    this.testInfo = testInfo;
  }

  /**
   * Get all repositories for the organization, handling pagination
   */
  async getAllRepositories(): Promise<any[]> {
    const allRepos: any[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const url = `https://api.github.com/orgs/SeleniumHQ/repos`;

      // Call API
      const response = await this.request.get(url, {
        params: { per_page: perPage, page: page },
      });

      // ATTACH REQUEST 
      await this.testInfo.attach(`Request - Page ${page}`, {
        body: JSON.stringify({
          url,
          method: 'GET',
          params: { per_page: perPage, page },
        }, null, 2),
        contentType: 'application/json',
      });

      // ATTACH RESPONSE 
      const responseBody = await response.json();
      await this.testInfo.attach(`Response - Page ${page}`, {
        body: JSON.stringify(responseBody, null, 2),
        contentType: 'application/json',
      });

      if (!response.ok()) {
        throw new Error(`Failed to fetch page ${page}. Status: ${response.status()}`);
      }

      if (!responseBody || responseBody.length === 0) break;

      allRepos.push(...responseBody);
      page++;

      if (page > 20) break;
    }

    return allRepos;
  }

  /**
   * Get total open issues for the organization
   */
  getTotalOpenIssues(repos: any[]): number {
    return repos.reduce((sum, repo) => sum + (repo.open_issues_count || 0), 0);
  }

  /**
   * Get the most recently updated repository for the organization
   */
  getMostRecentlyUpdatedRepo(repos: any[]): any {
    return [...repos].sort((a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )[0];
  }

  /**
   * Get the most watched repository for the organization
   */
  getMostWatchedRepository(repos: any[]): any {
    return repos.reduce((max, repo) =>
      repo.watchers_count > max.watchers_count ? repo : max
    );
  }
}