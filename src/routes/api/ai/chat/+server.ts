import openai from '$lib/server/openai';

export const POST = async ({ request }) => {
	const { chatMessages } = await request.json();
	return new Response(
		// Response body is a readable stream
		new ReadableStream({
			async start(controller) {
				// Set up stream with OpenAI API
				const completion = await openai.chat.completions.create({
					model: 'gpt-4-1106-preview', // or the model of your choice
					messages: chatMessages,
					stream: true
				});

				// Handle the incoming data chunks from OpenAI
				for await (const chunk of completion) {
					// Format the data as a Server-Sent Event
					const data = `data: ${JSON.stringify(chunk)}\n\n`;
					// Send the data to the client
					controller.enqueue(new TextEncoder().encode(data));
					if (chunk.choices[0].finish_reason === 'stop') {
						controller.close();
						return;
					}  
				}
			},
			cancel() {
				// Handle stream cancellation if needed
			}
		}),
		{
			// Headers for Server-Sent Events
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				Connection: 'keep-alive'
			}
		}
	);
};
