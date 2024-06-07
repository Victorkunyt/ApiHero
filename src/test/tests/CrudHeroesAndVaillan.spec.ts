import { test, expect, request, APIRequestContext } from '@playwright/test';

test.describe('API tests', () => {
  let apiContext: APIRequestContext;

  // Before all tests, create a new APIRequestContext
  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({
      baseURL: 'http://localhost:3131', 
      // extraHTTPHeaders: {
      //   'Authorization': `Bearer YOUR_API_KEY`, 
      // },
    });
  });

  // After all tests, dispose the APIRequestContext
  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test.only('GET /getPerson', async () => {
    const response = await apiContext.get('/getPerson');
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    console.log(responseBody)
   // expect(responseBody).toHaveProperty('key', 'expectedValue'); // Verifique a estrutura da resposta
  });

  test('POST /endpoint', async () => {
    const requestBody = {
      key1: 'value1',
      key2: 'value2',
    };

    const response = await apiContext.post('/endpoint', {
      data: requestBody,
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('key', 'expectedValue'); // Verifique a estrutura da resposta
  });

  test('PUT /endpoint', async () => {
    const requestBody = {
      key1: 'updatedValue1',
      key2: 'updatedValue2',
    };

    const response = await apiContext.put('/endpoint', {
      data: requestBody,
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('key', 'expectedValue'); // Verifique a estrutura da resposta
  });

  test('DELETE /endpoint', async () => {
    const response = await apiContext.delete('/endpoint');
    expect(response.ok()).toBeTruthy();
  });
});
