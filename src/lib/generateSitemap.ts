import { promises as fs } from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config(); // This loads the environment variables from .env file, needed for ORIGIN

const baseUrl = process.env.ORIGIN || 'http://localhost'; // fallback to localhost if ORIGIN is not set

// Add your paths to directories here, relative to `src/routes`
// Don't include subdirectories of the routes, only the top level ones
// Routes and subroutes with square brackets (e.g. [slug]) are skipped, 
// you'll have to implement your own logic for those
const routePaths = ['(landing)', '(auth)'];

async function getLastModifiedDate(filePath: string): Promise<string> {
	const stats = await fs.stat(filePath);
	return stats.mtime.toISOString();
}

function calculatePriority(depth: number): string {
	// Root route has priority 1.0, decrease as depth increases
	return (1 - depth * 0.1).toFixed(1);
}

async function generateSitemapEntry(dirPath: string, depth: number): Promise<string> {
	const pagePath = path.join(dirPath, '+page.svelte');
	const lastModDate = await getLastModifiedDate(pagePath);
	const routeBase = path.relative('./src/routes', dirPath);
	const relativePath = routeBase
		.split(path.sep)
		.filter((part) => !part.startsWith('(') && !part.endsWith(')')) // Exclude grouping folders
		.join('/')
		.replace(/[\\\/]$/, ''); // Remove trailing slash/backslash

	const url = `${baseUrl}/${relativePath}`;
	const priority = calculatePriority(depth);

	return `
<url>
    <loc>${url}</loc>
    <lastmod>${lastModDate}</lastmod>
    <priority>${priority}</priority>
</url>`;
}

async function generateSitemap(dirPath: string, depth: number = 0): Promise<string[]> {
	try {
		const entries = [];
		const items = await fs.readdir(dirPath, { withFileTypes: true });

		for (const item of items) {
			if (item.isDirectory()) {
                // Skip directories with square brackets and their children
                if (item.name.includes('[') || item.name.includes(']')) {
                    continue;
                }
				const subDirPath = path.join(dirPath, item.name);
				entries.push(...(await generateSitemap(subDirPath, depth + 1)));
			} else if (item.isFile() && item.name === '+page.svelte') {
				entries.push(await generateSitemapEntry(dirPath, depth));
			}
		}

		return entries;
	} catch (error) {
		console.error('Error generating sitemap:', error);
		return [];
	}
}

async function generateCmsSitemap(): Promise<string[]> {
    // Generate the sitemap urls for your CMS routes here
    // Then add ${(await generateCmsSitemap()).join('')} to the sitemap template below
    // Underneath the ${sitemapEntries.join('')} line
    return [`
<url>
    <loc>exampleurl.com/blog/some-post</loc>
    <lastmod>some-date</lastmod>
    <priority>0.8</priority>
</url>`
];
}

async function writeSitemap() {
	let sitemapEntries = [];

	for (const dir of routePaths) {
		const fullPath = path.resolve('./src/routes', dir);
		sitemapEntries.push(...(await generateSitemap(fullPath)));
	}

	const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('')}
</urlset>
    `;

	await fs.writeFile('static/sitemap.xml', sitemap.trim());
	console.log('Sitemap generated successfully!');
}

writeSitemap();
