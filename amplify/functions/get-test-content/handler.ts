import type { Schema } from "../../data/resource"
import { env } from '$amplify/env/get-test-content';
import OpenAI from "openai";


export const handler: Schema["getTestContent"]["functionHandler"] = async (event, context) => {
    const { prompt } = event.arguments
    // your function code goes here
    const openai = new OpenAI({ apiKey: env.API_KEY });
    try {
        const response = await openai.responses.create({
            model: "gpt-4.1-nano",
            input: prompt ?? "Nothing thank you.",
        });
        return response.output_text;
    } catch (error) {
        return 'Failed to generate content' + error;
    }
};