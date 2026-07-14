// @ts-check
import { test, expect } from "@playwright/test";

/**
 * Chatbot widget E2E tests.
 *
 * These tests verify:
 *  1. The floating chat button is visible on load.
 *  2. Clicking it opens the chat panel with greeting + suggestion chips.
 *  3. Sending a message via a chip renders the user bubble and an assistant reply.
 *  4. Clear chat resets to the greeting.
 *  5. The close button (or Escape) collapses the panel.
 *
 * NOTE: When GEMINI_API_KEY is not set the API returns the dev-mode canned
 * reply, which is still a non-empty string — so the assertion works in both
 * keyed and keyless environments.
 */

test.describe("Prism ChatWidget", () => {
  test.beforeEach(async ({ page }) => {
    // Clear persisted chat state so every test starts fresh
    await page.goto("/");
    await page.evaluate(() => localStorage.removeItem("prism_chat"));
    await page.reload();
  });

  test("floating button is visible on page load", async ({ page }) => {
    const btn = page.getByRole("button", { name: /open chat/i });
    await expect(btn).toBeVisible();
  });

  test("opens the chat panel on button click", async ({ page }) => {
    const openBtn = page.getByRole("button", { name: /open chat/i });
    await openBtn.click();

    // Panel (dialog role) should be visible
    const dialog = page.getByRole("dialog", { name: /prism assistant chat/i });
    await expect(dialog).toBeVisible();

    // Greeting message
    await expect(
      page.getByText(/I'm the Prism assistant/i)
    ).toBeVisible();

    // Suggestion chips
    await expect(
      page.getByRole("button", { name: /What services do you offer/i })
    ).toBeVisible();
  });

  test("sends a message via chip and receives an assistant reply", async ({
    page,
  }) => {
    // Open widget
    await page.getByRole("button", { name: /open chat/i }).click();

    // Click suggestion chip
    await page.getByRole("button", { name: /What services do you offer/i }).click();

    // User bubble should appear immediately
    await expect(
      page.getByText("What services do you offer?")
    ).toBeVisible();

    // Wait for assistant reply (API call; allow up to 30s)
    const assistantReply = page.locator(
      '[aria-live="polite"] >> text=/Prism|service|AI|voice|real estate|construction|demo/i'
    );
    await expect(assistantReply.first()).toBeVisible({ timeout: 30_000 });
  });

  test("clears chat history on clear button click", async ({ page }) => {
    // Open and send a message first
    await page.getByRole("button", { name: /open chat/i }).click();
    await page.getByRole("button", { name: /What services do you offer/i }).click();
    // Wait for user bubble to appear
    await expect(page.getByText("What services do you offer?")).toBeVisible();

    // Clear chat
    await page.getByRole("button", { name: /clear chat/i }).click();

    // Should be back to greeting only — user message gone
    await expect(page.getByText("What services do you offer?")).not.toBeVisible();
    await expect(page.getByText(/I'm the Prism assistant/i)).toBeVisible();
  });

  test("closes the panel with the close button", async ({ page }) => {
    await page.getByRole("button", { name: /open chat/i }).click();
    await expect(
      page.getByRole("dialog", { name: /prism assistant chat/i })
    ).toBeVisible();

    await page.getByRole("button", { name: /close chat/i }).click();
    await expect(
      page.getByRole("dialog", { name: /prism assistant chat/i })
    ).not.toBeVisible();
  });

  test("closes the panel with the Escape key", async ({ page }) => {
    await page.getByRole("button", { name: /open chat/i }).click();
    await expect(
      page.getByRole("dialog", { name: /prism assistant chat/i })
    ).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("dialog", { name: /prism assistant chat/i })
    ).not.toBeVisible();
  });

  test("input accepts text and send button becomes enabled", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /open chat/i }).click();

    const input = page.getByLabel(/message prism assistant/i);
    const sendBtn = page.getByRole("button", { name: /send message/i });

    // Initially disabled
    await expect(sendBtn).toBeDisabled();

    // After typing it becomes enabled
    await input.fill("Tell me about Prism packages");
    await expect(sendBtn).toBeEnabled();
  });
});
