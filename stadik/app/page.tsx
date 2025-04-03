import Link from 'next/link';
import {
    TypographyBlockquote,
    TypographyH1,
    TypographyMuted,
    TypographyP,
    TypographySmall,
} from '@/components/typography/typography';
import { getPostSlugs, getPostData } from '@/lib/blog';
import { Button } from '@/components/ui/button';
import { RightArrow } from '@/components/radix/icons';
import TagBadges from '@/components/badges/tag-badges';

export default async function Home() {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => {
            const postData = getPostData(slug);
            return { slug, data: postData.data };
        })
        .sort(
            (a, b) =>
                new Date(b.data.date).getTime() -
                new Date(a.data.date).getTime()
        );

    return (
        <>
            <div>
                <TypographyH1>Stadik</TypographyH1>
                <TypographyMuted>
                    A simple Static Site Generator using Next.js and Shadcn/ui
                </TypographyMuted>
            </div>
            <div>
                <TypographyBlockquote>
                    “Indeed, the ratio of time spent reading versus writing is
                    well over 10 to 1. We are constantly reading old code as
                    part of the effort to write new code. ...[Therefore,] making
                    it easy to read makes it easier to write.” <br />
                    <TypographySmall>
                        ― Robert C. Martin, Clean Code: A Handbook of Agile
                        Software Craftsmanship
                    </TypographySmall>
                </TypographyBlockquote>
            </div>
            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <div className="flex items-center gap-x-4">
                            <RightArrow />
                            <Link href={`/${post.slug}`}>
                                <Button variant="link">
                                    {post.data.title}
                                    {post.data.date}
                                </Button>
                            </Link>
                            <TagBadges tags={post.data.tags}></TagBadges>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
