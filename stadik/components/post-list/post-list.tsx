import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RightArrow } from '@/components/radix/icons';
import TagBadges from '@/components/badges/tag-badges';

interface Post {
    slug: string;
    data: {
        title: string;
        date: string;
        tags: string[];
    };
}

interface PostListProps {
    posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
    return (
        <ul>
            {posts.map((post) => (
                <li key={post.slug}>
                    <div className="flex items-center gap-x-4">
                        <RightArrow />
                        <Link href={`/${post.slug}`}>
                            <Button variant="link">
                                {post.data.title}, {post.data.date}
                            </Button>
                        </Link>
                        <TagBadges tags={post.data.tags}></TagBadges>
                    </div>
                </li>
            ))}
        </ul>
    );
}
