import fs from 'fs/promises';

try {
  const envRaw = await fs.readFile('.env.local', 'utf8');
  const m = envRaw.match(/^VITE_GEMINI_API_KEY=(.+)$/m);
  const apiKey = m ? m[1].trim() : process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error('No VITE_GEMINI_API_KEY found in .env.local or environment.');
    process.exit(2);
  }

  const { GoogleGenerativeAI } = await import('@google/generative-ai');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

  const prompt = `Quick connectivity test. Respond with short summary.`;

  console.log('Sending test prompt to Gemini...');
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  console.log('Gemini response:', text.trim());
} catch (err) {
  console.error('Gemini test failed:');
  console.error(err && err.stack ? err.stack : String(err));
  process.exit(1);
}
