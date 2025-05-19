// src/hooks/useAI.js

// Call this function with a prompt/question and it returns the AI-generated response
export async function getAIExplanation(question) {
  const apiKey = "YOUR_OPENAI_API_KEY"; // <-- Insert your actual API key here

const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        model: "gpt-3.5-turbo", // Or "gpt-4" if available and you have access
        messages: [{ role: "user", content: `Explain this: ${question}` }]
    }),
});

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (data.choices && data.choices.length > 0) {
    return data.choices[0].message.content.trim();
  } else {
    throw new Error("No response from OpenAI.");
  }
}