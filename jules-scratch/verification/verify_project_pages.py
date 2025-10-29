from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Projects Page
    page.goto("http://localhost:5173/projects")
    page.screenshot(path="jules-scratch/verification/projects.png")

    # Project Details Page (assuming a project with id '1' exists)
    page.goto("http://localhost:5173/project/1")
    page.screenshot(path="jules-scratch/verification/project-details.png")

    # Login as Admin
    page.goto("http://localhost:5173/login")
    page.wait_for_selector('input[name="email"]')
    page.fill('input[name="email"]', 'admin@rotary.com')
    page.fill('input[name="password"]', 'password')
    page.click('button[type="submit"]')
    page.wait_for_url("http://localhost:5173/")

    # Admin Page
    page.goto("http://localhost:5173/admin")
    page.screenshot(path="jules-scratch/verification/admin.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
