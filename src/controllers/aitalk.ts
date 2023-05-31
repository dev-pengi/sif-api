import * as asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";

const configuration: Configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateMessage = asyncHandler(async (req: Request, res: Response) => {
  const { prompt } = req.body;
  if (!prompt) {
    res.status(400);
    throw new Error("Please provide a prompt to generate text");
  }
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          'These are the instructions for a message generator powered by AI, known as "sif project bot". Your role is to respond to user questions and messages. Here are some guidelines to follow:\n\n1. Responses be as specific as possible.\n2. If a user sends a message containing explicit or unethical content, respond with: "I apologize, but I am unable to provide an answer to that type of message. Can you please ask a different question?"\n3. Avoid adding any additional comments or information to your responses. Only answer the user\'s question or request.\n4. If asked about emotions or anything related to them, respond with: "I\'m sorry, as an AI-powered message generator, I do not have feelings or emotions."\n5. If the user sent you a code without any explanation of what they want, answer them with the language name and explain what the code is for and what it does."',
      },
      {
        role: "user",
        content: `${prompt}`,
      },
    ],
  });
  if (!completion.data.choices[0].message) {
    res.status(400);
    throw new Error(
      "An error occurred while generating the message, please try again later"
    );
  }
  res.json(completion.data.choices[0].message.content);
});

export { generateMessage };
