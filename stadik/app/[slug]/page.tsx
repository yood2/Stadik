import { notFound } from 'next/navigation';
import { getPostData, getPostSlugs } from '@/lib/blog';
import {
    TypographyH1,
    TypographyMuted,
} from '@/components/typography/typography';
import MarkdownRenderer from '@/components/markdown-renderer/markdown-renderer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

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
        <div>
            <TypographyH1>{post?.data.title}</TypographyH1>
            <TypographyMuted>Tags: {post?.data.tags}</TypographyMuted>
            <TypographyMuted>{post?.data.date}</TypographyMuted>
            <MarkdownRenderer content={post?.content} />
        </div>
    );
}
