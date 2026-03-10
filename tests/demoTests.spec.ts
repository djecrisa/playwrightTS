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
            await expect.soft(page.locator('.modal-content tbody tr:has-text("Student Name")').locator('td').nth(1), 'Name Checking').toContainText('Crisa De Juan');
            await expect.soft(page.locator('.modal-content tbody tr').nth(1).locator('td').nth(1), 'Email Checking').toContainText('dejuancrisa@gmail.com');
            await expect.soft(page.locator('.modal-content tbody tr').nth(2).locator('td').nth(1), 'Gender Checking').toContainText('Female');
            await expect.soft(page.locator('.modal-content tbody tr').nth(3).locator('td').nth(1), 'Number Checking').toContainText('9663853712');
            await expect.soft(page.locator('.modal-content tbody tr').nth(4).locator('td').nth(1), 'Bday Checking').toContainText('08 October,1993');
            await expect.soft(page.locator('.modal-content tbody tr').nth(5).locator('td').nth(1), 'Subject Checking').toContainText('English');
            await expect.soft(page.locator('.modal-content tbody tr').nth(6).locator('td').nth(1), 'Hobbies Checking').toContainText('Sports');
            await expect.soft(page.locator('.modal-content tbody tr').nth(7).locator('td').nth(1), 'Picture Checking').toContainText('');
            await expect.soft(page.locator('.modal-content tbody tr').nth(8).locator('td').nth(1), 'Address Checking').toContainText('Malolos, Bulacan');
            await expect.soft(page.locator('.modal-content tbody tr').nth(9).locator('td').nth(1), 'State and City Checking').toContainText('NCR Delhi');

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

    type StudentData = {
        studentFirstName : string;
        studentlastName : string;
        studentEmail : string;
        gender : string;
        mobile : string;
        birthDay: string;
        birthMonth: string;
        birthYear: string;
        subjects : string[];
        hobbies : string[];
        picture : string;
        address : string;
        state : string;
        city : string;
    };

    const students : StudentData[] = [
        {
            studentFirstName: 'Crisa', 
            studentlastName: 'De Juan', 
            studentEmail: 'dejuancrisa@gmail.com',
            gender: 'Female', 
            mobile: '9663853712', 
            birthDay: '8',
            birthMonth: 'October',
            birthYear: '1993',
            subjects: ['English'], 
            hobbies: ['Sports'], 
            picture: '',
            address: 'Malolos, Bulacan', 
            state: 'NCR', 
            city: 'Delhi'
        },

        {
            studentFirstName: 'Jason', 
            studentlastName: 'Eligio', 
            studentEmail: 'jasoneligio@gmail.com',
            gender: 'Male', 
            mobile: '9663853713', 
            birthDay: '13', 
            birthMonth: 'May',
            birthYear: '1991',
            subjects: ['English', 'Maths'], 
            hobbies: ['Reading'], 
            picture: '',
            address: 'GenTri, Cavite', 
            state: 'Uttar Pradesh', 
            city: 'Agra'
        },

        {
            studentFirstName: 'Catherine', 
            studentlastName: 'Eligio', 
            studentEmail: 'cjeligio@gmail.com',
            gender: 'Other', 
            mobile: '9663853714', 
            birthDay: '31', 
            birthMonth: 'March',
            birthYear: '2018',
            subjects: ['Computer Science'], 
            hobbies: ['Reading', 'Music'], 
            picture: '',
            address: 'Pasig', 
            state: 'Haryana', 
            city: 'Karnal'
        }
    ];


    students.forEach(data => {
        

        test(`Student Registration Form - Combination Test - ${data.studentFirstName} ${data.studentlastName}`, async ({ page }) => {

            await test.step('Step 1 - Go to Site ', async () => {
                await page.goto('https://demoqa.com/automation-practice-form');
            });

            await test.step('Step 2 - Enter valid data', async () => {
                await page.getByRole('textbox', { name: 'First Name' }).fill(data.studentFirstName);

                await page.getByRole('textbox', { name: 'Last Name' }).fill(data.studentlastName);

                await page.getByRole('textbox', { name: 'name@example.com' }).fill(data.studentEmail);

                await page.getByRole('radio', { name: data.gender, exact: true}).check();

                await page.getByRole('textbox', { name: 'Mobile Number' }).fill(data.mobile);

                await page.locator('#dateOfBirthInput').click();

                await page.getByRole('combobox').first().selectOption(data.birthMonth);
                await page.getByRole('combobox').nth(1).selectOption(data.birthYear);
                await page.locator('div[role="gridcell"]:not(.react-datepicker__day--outside-month)').filter({ hasText: new RegExp(`^${data.birthDay}$`) }).click();
                
                for (const element of data.subjects) {
                      await page.locator('#subjectsInput').fill(element);
                      await page.getByRole('option', { name: element }).click();
                }

                for (const element of data.hobbies) {
                     await page.getByRole('checkbox', { name: element }).check();
                }

                await page.getByRole('textbox', { name: 'Current Address' }).fill(data.address);

                await page.locator('#state > .css-13cymwt-control > .css-1wy0on6 > .css-1xc3v61-indicatorContainer').click();
                await page.getByRole('option', { name: data.state }).click();
                await page.locator('#city > .css-13cymwt-control > .css-1wy0on6 > .css-1xc3v61-indicatorContainer').click();
                await page.getByRole('option', { name: data.city }).click();

                await page.getByRole('button', { name: 'Submit' }).click();
            });

            await test.step('Step 3 - Validate data entered', async () => {
                await expect.soft(page.locator('.modal-content tbody tr:has-text("Student Name")').locator('td').nth(1), 'Name Checking').toContainText(`${data.studentFirstName} ${data.studentlastName}`);
                await expect.soft(page.locator('.modal-content tbody tr').nth(1).locator('td').nth(1), 'Email Checking').toContainText(data.studentEmail);
                await expect.soft(page.locator('.modal-content tbody tr').nth(2).locator('td').nth(1), 'Gender Checking').toContainText(data.gender);
                await expect.soft(page.locator('.modal-content tbody tr').nth(3).locator('td').nth(1), 'Number Checking').toContainText(data.mobile);
                await expect.soft(page.locator('.modal-content tbody tr').nth(4).locator('td').nth(1), 'Bday Checking').toContainText(`${data.birthDay} ${data.birthMonth},${data.birthYear}`);
                await expect.soft(page.locator('.modal-content tbody tr').nth(5).locator('td').nth(1), 'Subject Checking').toContainText(data.subjects.join(', '));
                await expect.soft(page.locator('.modal-content tbody tr').nth(6).locator('td').nth(1), 'Hobbies Checking').toContainText(data.hobbies.join(', '));
                await expect.soft(page.locator('.modal-content tbody tr').nth(7).locator('td').nth(1), 'Picture Checking').toContainText('');
                await expect.soft(page.locator('.modal-content tbody tr').nth(8).locator('td').nth(1), 'Address Checking').toContainText(data.address);
                await expect.soft(page.locator('.modal-content tbody tr').nth(9).locator('td').nth(1), 'State and City Checking').toContainText(`${data.state} ${data.city}`);

            });

        }); 

    });

});
