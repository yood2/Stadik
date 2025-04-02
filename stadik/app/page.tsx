// app/page.tsx
import Link from 'next/link';
import {
    TypographyBlockquote,
    TypographyH1,
} from '@/components/typography/typography';
import { getPostSlugs, getPostData } from '@/lib/blog';
import { Button } from '@/components/ui/button';

export default async function Home() {
    const slugs = getPostSlugs();
    // For each slug, get the post data (metadata)
    const posts = slugs.map((slug) => {
        const postData = getPostData(slug);
        return { slug, data: postData.data };
    });

    return (
        <>
            <TypographyH1>Stadik Blog</TypographyH1>
            <TypographyBlockquote>
                A simple Static Site Generator using Next.js and Shadcn/ui
            </TypographyBlockquote>
            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link href={`/${post.slug}`}>
                            <Button variant="link">
                                {post.data.title ? post.data.title : post.slug}{' '}
                                - {post.data.tags} - {post.data.date}
                            </Button>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
