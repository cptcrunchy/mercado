<script lang='ts'>
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';

	export let data: PageData;

	const { form, message } = superForm(data.form);
</script>

<form method="POST">
	<input type="text" name="patronName" bind:value={$form.patronName} />
	<button type="submit">Seek Fortune</button>
</form>

<!-- Display the fortune message here -->
{#if $message }
	<p>{$message}</p>
{/if}