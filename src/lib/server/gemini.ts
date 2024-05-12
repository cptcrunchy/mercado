import { GoogleGenerativeAI } from "@google/generative-ai";
import { GOOGLE_GEMINI_API_KEY } from "$env/static/private";

const mercado = new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY);

async function fortuneTeller(patronName: string): Promise<string> {
	// For text-only input, use the gemini-pro model
	const model = mercado.getGenerativeModel({ model: "gemini-pro"});
 
	const prompt = `You are a carnival fortune teller in a box, MercadoAI.
	Your fortunes can not exceed 500 characters, exclude "stage direction",
	be customized to the patrons name. Ensure a name is given, otherwise give
	a snarky remark if the name is omitted or foul words are given.
	Patron's name: ${patronName}`
 
	const result = await model.generateContent(prompt);
	const response = result.response;
	const text = response.text();
	return text;
 }
 
export { fortuneTeller }