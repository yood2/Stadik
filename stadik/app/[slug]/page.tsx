import { notFound } from 'next/navigation';
import { getPostData, getPostSlugs } from '@/lib/blog';

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    return getPostSlugs().map((slug) => ({ slug }));
}

export default async function BlogPost({ params }: PageProps) {
    let post;
    try {
        post = await getPostData(params.slug);
    } catch (error) {
        notFound();
    }

    return (
        <div>
            <h1>{post?.data.title || params.slug}</h1>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{post?.content}</pre>
        </div>
    );
}
