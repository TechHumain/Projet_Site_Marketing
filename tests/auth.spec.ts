import { test, expect } from '@playwright/test';

test.describe('Accès au tableau de bord', () => {
  test('un visiteur est redirigé et peut accéder après connexion mock', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Connexion' })).toBeVisible();

    await page.getByRole('button', { name: 'Se connecter avec Mock OAuth' }).click();

    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Bonjour Jean Dupont');
    await expect(page.getByRole('button', { name: 'Se déconnecter' })).toBeVisible();
  });
});
