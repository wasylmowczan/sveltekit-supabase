import openai from '$lib/server/openai.js';

export const POST = async ({ request }) => {
	const { input } = await request.json();

	const response = await openai.audio.speech.create({
		model: 'tts-1',
		input,
		voice: 'alloy'
	});
	const fileBuffer = await response.arrayBuffer();
	return new Response(fileBuffer, {});
};
