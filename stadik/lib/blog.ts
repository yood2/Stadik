import fs from 'fs';
import path from 'path';

const blogDirectory = path.join(process.cwd(), 'public', 'blog');

export function getPostSlugs(): string[] {
    return fs
        .readdirSync(blogDirectory)
        .map((filename) => filename.replace(/\.md$/, ''));
}

interface PostData {
    data: { [key: string]: string };
    content: string;
}

export function getPostData(slug: string): PostData {
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
        throw new Error(`Post not found: ${slug}`);
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    let data: { [key: string]: string } = {};
    let content = fileContents;

    // Check if the file starts with YAML frontmatter
    if (fileContents.startsWith('---')) {
        const endIndex = fileContents.indexOf('---', 3);
        if (endIndex !== -1) {
            const yamlText = fileContents.slice(3, endIndex).trim();
            content = fileContents.slice(endIndex + 3).trim();

            // Parse each line of the YAML
            yamlText.split('\n').forEach((line) => {
                const [key, ...rest] = line.split(':');
                if (key && rest.length) {
                    let value = rest.join(':').trim();
                    // Remove quotes if present
                    value = value.replace(/^['"]|['"]$/g, '');
                    data[key.trim()] = value;
                }
            });
        }
    }

    return { data, content };
}
