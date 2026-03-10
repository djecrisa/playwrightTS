import { test, expect } from '@playwright/test';

test.describe('Student Registration Form Tests', () => {

    test('Student Registration Form - Happy Path', async ({ page }) => {

        await test.step('Step 1 - Go to Site ', async () => {
            await page.goto('https://demoqa.com/automation-practice-form');
        });

        await test.step('Step 2 - Enter valid data', async () => {
            await page.getByRole('textbox', { name: 'First Name' }).fill('Crisa');

            await page.getByRole('textbox', { name: 'Last Name' }).fill('De Juan');

            await page.getByRole('textbox', { name: 'name@example.com' }).fill('dejuancrisa@gmail.com');

            await page.getByRole('radio', { name: 'Female' }).check();

            await page.getByRole('textbox', { name: 'Mobile Number' }).fill('9663853712');

            await page.locator('#dateOfBirthInput').click();
            await page.getByRole('combobox').first().selectOption('October');
            await page.getByRole('combobox').nth(1).selectOption('1993');
            await page.getByRole('gridcell', { name: 'Choose Friday, October 8th,' }).click();

            await page.locator('#subjectsInput').fill('English');
            await page.getByRole('option', { name: 'English' }).click();

            await page.getByRole('checkbox', { name: 'Sports' }).check();

            await page.getByRole('textbox', { name: 'Current Address' }).fill('Malolos, Bulacan');

            await page.locator('#state > .css-13cymwt-control > .css-1wy0on6 > .css-1xc3v61-indicatorContainer').click();
            await page.getByRole('option', { name: 'NCR' }).click();
            await page.locator('#city > .css-13cymwt-control > .css-1wy0on6 > .css-1xc3v61-indicatorContainer').click();
            await page.getByRole('option', { name: 'Delhi' }).click();

            await page.getByRole('button', { name: 'Submit' }).click();
        });

        await test.step('Step 3 - Validate data entered', async () => {
            await expect(page.locator('.modal-content tbody tr:has-text("Student Name")').locator('td').nth(1)).toContainText('Crisa De Juan');
            await expect(page.locator('.modal-content tbody tr').nth(1).locator('td').nth(1)).toContainText('dejuancrisa@gmail.com');
            await expect(page.locator('.modal-content tbody tr').nth(2).locator('td').nth(1)).toContainText('Female');
            await expect(page.locator('.modal-content tbody tr').nth(3).locator('td').nth(1)).toContainText('9663853712');
            await expect(page.locator('.modal-content tbody tr').nth(4).locator('td').nth(1)).toContainText('08 October,1993');
            await expect(page.locator('.modal-content tbody tr').nth(5).locator('td').nth(1)).toContainText('English');
            await expect(page.locator('.modal-content tbody tr').nth(6).locator('td').nth(1)).toContainText('Sports');
            await expect(page.locator('.modal-content tbody tr').nth(7).locator('td').nth(1)).toContainText('');
            await expect(page.locator('.modal-content tbody tr').nth(8).locator('td').nth(1)).toContainText('Malolos, Bulacan');
            await expect(page.locator('.modal-content tbody tr').nth(9).locator('td').nth(1)).toContainText('NCR Delhi');

            await expect(page.locator('//div[@class="modal-content"]//tbody/tr').nth(9).locator('td').nth(1)).toContainText('NCR Delhi');
        });

    });


   test('Student Registration Form - Negative Path (Blank Scenario)', async ({ page }) => {

        await test.step('Step 1 - Go to Site ', async () => {
            await page.goto('https://demoqa.com/automation-practice-form');
        });

        await test.step('Step 2 - Submit Blank Fields ', async () => {
             await page.getByRole('button', { name: 'Submit' }).click();
        });

        await test.step('Step 3 - Validate data entered', async () => {
            await expect(page.getByRole('textbox', { name: 'First Name' })).toHaveCSS('border-color','rgb(220, 53, 69)');
            await expect(page.getByRole('textbox', { name: 'First Name' })).toHaveCSS('background-image', /data:image\/svg\+xml/);

            await expect(page.getByRole('textbox', { name: 'Last Name' })).toHaveCSS('border-color','rgb(220, 53, 69)');
            await expect(page.getByRole('textbox', { name: 'Last Name' })).toHaveCSS('background-image', /data:image\/svg\+xml/);

            await expect(page.getByRole('textbox', { name: 'Mobile Number' })).toHaveCSS('border-color','rgb(220, 53, 69)');
            await expect(page.getByRole('textbox', { name: 'Mobile Number' })).toHaveCSS('background-image', /data:image\/svg\+xml/);


            await expect(page.getByRole('radio', { name: 'Male', exact: true })).toHaveCSS('border-color','rgb(220, 53, 69)');
            await expect(page.getByText('Male', { exact: true })).toHaveCSS('color', 'rgb(220, 53, 69)');

            await expect(page.getByRole('radio', { name: 'Female' })).toHaveCSS('border-color','rgb(220, 53, 69)');
            await expect(page.getByText('Female')).toHaveCSS('color', 'rgb(220, 53, 69)');

            await expect(page.getByRole('radio', { name: 'Other' })).toHaveCSS('border-color','rgb(220, 53, 69)');
            await expect(page.getByText('Other')).toHaveCSS('color', 'rgb(220, 53, 69)');

        });

    });



});