import { GoogleGenerativeAI } from "@google/generative-ai";


const generate = async (req, res) => {
  const genAI = new GoogleGenerativeAI('AIzaSyDZeSOhO2LM5cKZ_zwUiB9CrrO4BZmjUGM'); //TODO: set as env

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash-002',
  });

  const generationConfig = {
    responseMimeType: "text/plain",
    maxOutputTokens: 8192,
    temperature: 0.2,
    topP: 0.8,
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [{ text: 'Você é um nutricionista especilaista na criaca de dietas, com base em uma sequencia de dados que vo te passar, preciso que voce monte a melhor dieta possivel. a mais adequada tambem' }],
      },
    ],
  });

  const result = await chatSession.sendMessage(
    `{
  "weight": "75",  // Peso em kg
  "height": "175",  // Altura em cm
  "age": "28",  // Idade
  "goal": "Emagrecimento e ganho de massa muscular",
  "calories": "2500",
  "gender": "Masculino",
  "activityLevel": "Moderado (exercício leve 3-5 dias por semana)",
  "training": "Sim, Treino na academia",
  "mealTimes": "07:30, 12:00, 16:00, 19:30",
  "chocolate": "Sim, uma porção pequena por semana",
  "breakfast": [
    "Ovos mexidos com espinafre",
    "Aveia com frutas"
  ],
  "lunch": [
    "Peito de frango grelhado",
    "Batata-doce",
    "Arroz integral"
  ],
  "snacks": [
    "Iogurte grego com granola",
    "Frutas (banana, maçã)",
    "Amêndoas"
  ],
  "dinner": [
    "Peixe grelhado",
    "Legumes no vapor",
    "Quinoa"
  ]
}
`
  );

  res.status(200).json(result);
}

export {
  generate
}
