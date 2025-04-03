import { notFound } from 'next/navigation';
import { getPostData, getPostSlugs } from '@/lib/blog';
import {
    TypographyH1,
    TypographyMuted,
} from '@/components/typography/typography';
import MarkdownRenderer from '@/components/markdown-renderer/markdown-renderer';

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    return getPostSlugs().map((slug) => ({ slug }));
}

export default async function BlogPost({ params }: PageProps) {
    const { slug } = await params;
    let post;
    try {
        post = await getPostData(slug);
    } catch (error) {
        notFound();
    }

    return (
        <>
            <div>
                <div>
                    <TypographyH1>{post?.data.title}</TypographyH1>
                    <TypographyMuted>{post?.data.tags}</TypographyMuted>
                    <TypographyMuted>{post?.data.date}</TypographyMuted>
                </div>
                <MarkdownRenderer content={post?.content} />
            </div>
        </>
    );
}
