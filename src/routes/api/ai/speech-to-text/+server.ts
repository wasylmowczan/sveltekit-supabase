import openai from '$lib/server/openai.js';
import fs from 'fs';

export const POST = async ({ request }) => {
	const formData= await request.formData();
    const file = formData.get('file') as File;
	const response = await openai.audio.transcriptions.create({
		file: file,
		model: 'whisper-1'
	});
	return new Response(JSON.stringify({ text: response.text }));
};
