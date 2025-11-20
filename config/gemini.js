// --- CONFIGURAÇÃO DA API GEMINI ---
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ""; 

export const callGeminiAPI = async (prompt, systemInstruction = "") => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;
  
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  const maxRetries = 5;
  let delay = 1000;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpe, não consegui processar a resposta no momento.";
    } catch (error) {
      console.error(`Tentativa ${i + 1} falhou:`, error);
      if (i === maxRetries - 1) return "Ocorreu um erro ao conectar com a IA. Tente novamente mais tarde.";
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
};

