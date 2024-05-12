import { fortuneTeller } from "$lib/server/gemini";
import type { Actions } from "./$types";
import { fortuneSchema } from "$lib/schema";
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(fortuneSchema));
		const fortune = await fortuneTeller(form.data.patron);
		return message(form, fortune);
	}
};

const load = async () => {
	const form = await superValidate(zod(fortuneSchema));
	return { form };
}

export { actions, load }