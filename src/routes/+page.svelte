<script lang='ts'>
  import { fly, fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
  import { quintOut } from 'svelte/easing';


	export let data: PageData;

	const { delayed, enhance, form, message } = superForm(data.form, {
		resetForm: true,
		multipleSubmits: "prevent"
	});

	function typewriter(node: Node) {
		const text = $message;
		const duration = $message.length / (2 * 0.01);
		return {
			duration,
			tick: (t: number) => {
				const i = Math.trunc($message.length * t);
				node.textContent = text.slice(0,i);
			}
		}
	}

	$:formDelay = $message && $message.length / (2 * 0.01);

</script>

<div class="block">
	<div class="card max-w-4xl bg-base-100 shadow-xl border-4 z-20 border-yellow-500">
		<figure class="max-w-lg">
			<img src="/mercado-v1.png" alt="Fortune Teller MercadoAI" />
		</figure>
		<div class="card-body">
			<form method="POST" class="flex flex-col items-center gap-2" use:enhance>
				<label class="form-control w-full max-w-xs">
					<div class="label">
						<span class="label-text text-lg">What is your name?</span>
					</div>
					<input 
					type="text" 
					name="patron" 
					placeholder="Type here" 
					class="input input-bordered w-full max-w-xs"
					bind:value={$form.patron} />
				</label>
				<button type="submit" class="btn btn-active btn-primary btn-wide" disabled={$delayed}>
					{#if !$delayed}
						Seek Fortune
					{:else}
						Looking into Crystal Ball <span class="loading loading-ring loading-xs"></span>
					{/if}
				</button>
			</form>
		</div>
	</div>
<!-- Display the fortune message here -->
{#if $message}
	<div 
		class="card max-w-[520px] bg-base-100 shadow-xl border-4 relative z-10 border-yellow-500"
		transition:fly={{
			delay: 250,
			duration: 2000,
			easing: quintOut,
			y: '-80%',
		}}>
		<div class="card-body">
			<p in:typewriter>
				{$message}
			</p>
			<form method="POST" in:fade={{ delay: formDelay, duration: 2000}}>
				<p>Send a copy of your fortune by entering your e-mail below
					or you can post to social media. #MercadoAI #fortuneteller.</p>
				<div class="join">
					<input class="input input-bordered join-item" placeholder="Email"/>
					<button class="btn btn-success join-item rounded-r-full">Send</button>
				</div>
			</form>
		</div>
	</div>
{/if}
</div>

<!-- <script>
	import { fade } from 'svelte/transition'
	let visible = false;

	function typewriter(node, { speed = 1 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}
		const text = node.textContent;
		const duration = text.length / (speed * 0.01);
		
		return {
			duration,
			tick: (t) => {
				const i = Math.trunc(text.length * t);
				node.textContent = text.slice(0,i);
			}
		};
	}
	const message = "The quick brown fox jumps over the lazy dog"
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<p transition:typewriter>
		{message}
	</p>
	<form method="POST" transition:fade={{ delay: (message.legth / (2 * 0.01)), duration: 4000}}>
		<div class="join">
			<input class="input input-bordered join-item" placeholder="Email"/>
			<button class="btn join-item rounded-r-full">Send</button>
		</div>
	</form>
{/if} -->
