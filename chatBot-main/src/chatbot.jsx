import OpenAI from "openai";
import { OPENAI_API_KEY } from "@env";

const chatbot = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const fetchHaiku = async () => {
  try {
    const completion = await chatbot.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Write a haiku about AI" }],
    });

    if (completion.choices && completion.choices.length > 0) {
      console.log(completion.choices[0].message.content);
    } else {
      console.log("No response from OpenAI.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

fetchHaiku();
