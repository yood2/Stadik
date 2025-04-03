import { Badge } from '@/components/ui/badge';

interface TagBadgesProps {
    tags: string;
}

export default function TagBadges({ tags }: TagBadgesProps) {
    const processed = tags.split(',').map((tag) => tag.trim());

    return (
        <div className="flex flex-wrap gap-2">
            {processed.map((tag, index) => (
                <Badge key={index} variant="outline">
                    {tag}
                </Badge>
            ))}
        </div>
    );
}
