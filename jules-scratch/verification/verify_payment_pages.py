from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Login as a regular user
    page.goto("http://localhost:5173/login")
    page.wait_for_selector('input[name="email"]')
    page.fill('input[name="email"]', 'member@rotary.com')
    page.fill('input[name="password"]', 'password')
    page.click('button[type="submit"]')
    page.wait_for_url("http://localhost:5173/")

    # Membership Page
    page.goto("http://localhost:5173/membership")
    page.screenshot(path="jules-scratch/verification/membership.png")

    # Payment History Page
    page.goto("http://localhost:5173/payment-history")
    page.screenshot(path="jules-scratch/verification/payment-history.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
