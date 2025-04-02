import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const blogDirectory = path.join(process.cwd(), 'public', 'blog');
    const filenames = fs.readdirSync(blogDirectory);

    return filenames.map((filename) => ({
        slug: filename.replace(/\.md$/, ''),
    }));
}

export default function BlogPost({ params }: PageProps) {
    const blogDirectory = path.join(process.cwd(), 'public', 'blog');
    const fullPath = path.join(blogDirectory, `${params.slug}.md`);

    // If the file doesn't exist, you can trigger a 404 page
    if (!fs.existsSync(fullPath)) {
        notFound();
    }

    const content = fs.readFileSync(fullPath, 'utf8');

    return (
        <div>
            <h1>{params.slug}</h1>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{content}</pre>
        </div>
    );
}
