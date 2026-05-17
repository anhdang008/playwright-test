import { test, expect } from '@playwright/test';
import { GitHubOrganizationService } from '../api/githubOrganization.service';

test.describe('GitHub Organization API Tests', () => {
  test('Get organization stats with request/response attached', async ({ request }, testInfo) => {
    const githubService = new GitHubOrganizationService(request, testInfo);

    // Step 1: Get all repositories
    const allRepos = await githubService.getAllRepositories();

    const totalOpenIssues = githubService.getTotalOpenIssues(allRepos);
    const mostRecentlyUpdated = githubService.getMostRecentlyUpdatedRepo(allRepos);
    const mostWatchedRepo = githubService.getMostWatchedRepository(allRepos);


    // Step 2: Assertions
    expect(allRepos.length).toBeGreaterThan(0);
    expect(totalOpenIssues).toBeGreaterThanOrEqual(0);
    expect(mostRecentlyUpdated).toBeDefined();
    expect(mostWatchedRepo.watchers_count).toBeGreaterThan(0);

    // Step 3: Log results
    console.log(`Total Repositories: ${allRepos.length}`);
    console.log(`Total Open Issues: ${totalOpenIssues}`);
    console.log(`Most Recently Updated: ${mostRecentlyUpdated.full_name}`);
    console.log(`Most Watched Repo: ${mostWatchedRepo.full_name}`);
  });
});