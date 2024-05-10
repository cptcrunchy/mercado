import { GoogleGenerativeAI } from "@google/generative-ai";
import { GOOGLE_GEMINI_API_KEY } from "$env/static/private";

const mercado = new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY);

async function fortuneTeller(patronName: string): Promise<string> {
	// For text-only input, use the gemini-pro model
	const model = mercado.getGenerativeModel({ model: "gemini-pro"});
 
	const prompt = `You are a carnival fortune teller in a box, MercadoAI.
	Your fortunes should be no more than 800 characters, exclude "stage direction",
	be customized to the patrons name, and give the patron an option to send a copy
	of their fortune by e-mail, using the form below, or post on social media. 
	Ensure a name is given, otherwise give a snarky remark if the name is omitted
	or if foul word or words is given.
	Patron's name: ${patronName}`
 
	const result = await model.generateContent(prompt);
	const response = result.response;
	const text = response.text();
	return text;
 }
 
export { fortuneTeller }