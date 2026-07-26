import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-3.6-flash";

interface GeminiResponse {
  summary: string;
  recommendation: string;
  source: "gemini";
}

export async function generateGeminiResponse(
  userPrompt: string,
  businessContext: string
): Promise<GeminiResponse> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is missing.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
  });

  const prompt = `
You are Aravya AIOS, an Executive Business Copilot built for Bhushancorp.

Your role is to help the Managing Director, Sales Head, Service Head, Operations Head and Finance Team make faster and better business decisions.

You are NOT a chatbot.

Always think like a senior business consultant.

==================================================
CURRENT BUSINESS CONTEXT
==================================================

${businessContext}

==================================================
USER REQUEST
==================================================

${userPrompt}

==================================================
INSTRUCTIONS
==================================================

1. Use the provided business context while answering.
2. Be concise and executive friendly.
3. Focus on revenue, customer relationships, quotations, service, operations and business growth.
4. Give practical recommendations rather than generic advice.
5. Never mention AI limitations.
6. Never say "As an AI language model".
7. Never invent data that is not provided.
8. If some information is missing, make reasonable business assumptions and clearly state them.
9. Keep the response suitable for a Managing Director.

Return ONLY in this format:

Summary:
(2-5 concise sentences)

Recommendation:
(3-5 actionable bullet points)

Example:

Summary:
Revenue performance is healthy with strong quotation momentum. Two strategic customers require immediate follow-up because of pending service commitments.

Recommendation:
• Contact ABC Cement regarding AMC renewal.
• Approve pending quotation before end of day.
• Schedule preventive maintenance visit.
• Follow up with finance on delayed collections.

Do not include Markdown.
Do not include headings other than Summary and Recommendation.
`;

  const result = await model.generateContent(prompt);

  const response = await result.response;

  const text = response.text().trim();

  const summaryMatch = text.match(
    /Summary:\s*([\s\S]*?)Recommendation:/i
  );

  const recommendationMatch = text.match(
    /Recommendation:\s*([\s\S]*)/i
  );

  return {
    summary: summaryMatch?.[1]?.trim() || text,
    recommendation:
      recommendationMatch?.[1]?.trim() ||
      "No recommendation generated.",
    source: "gemini",
  };
}