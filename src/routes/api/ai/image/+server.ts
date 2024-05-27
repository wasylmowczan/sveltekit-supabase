import openai from '$lib/server/openai';

export const POST = async ({request}) => {
    const {prompt} = await request.json();

    const response = await openai.images.generate({
        model: "dall-e-3", // dall-e-2, dall-e-3
        prompt: prompt,
        n: 1,
        size: "1024x1024", // 1024x1024, 1792x1024, or 1024x1792 for dall-e-3
        quality: 'standard' // standard or hd
    })
    return new Response(JSON.stringify({image: response.data[0]}));
};