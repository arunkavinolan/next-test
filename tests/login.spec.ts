import { test, expect } from '@playwright/test';

test('user can log in successfully', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  
  await page.fill('input[name="input-token"]', 'dre3456ty');
  //await page.fill('input[name="password"]', 'password123');

  await page.click('button[type="submit"]');
  

  await expect(page).toHaveURL('http://localhost:3000/chat');
  await expect(page.locator('h1')).toContainText('Hi Arunkavi! How can I help you today?');
});


test('user sees error message on invalid Login ', async({page})=>{

    await page.goto('http://localhost:3000/');
    console.log('Enter the main url');

    await page.fill('input[name="input-token"]',''); 
   
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe('Please enter a token to Login!');
        await dialog.accept();
    })


    await page.click('#login-button');
    
}); 




