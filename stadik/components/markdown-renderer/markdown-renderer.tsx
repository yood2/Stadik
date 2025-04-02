import React from 'react';
import {
    TypographyH1,
    TypographyH2,
    TypographyH3,
    TypographyH4,
    TypographyP,
} from '@/components/typography/typography';

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    const elements: React.ReactNode[] = [];
    const headingRegex = /(^|\n)(#{1,4}) (.*?)(?=\n|$)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = headingRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
            const paragraphText = content.slice(lastIndex, match.index).trim();
            if (paragraphText) {
                elements.push(
                    <TypographyP key={elements.length}>
                        {paragraphText}
                    </TypographyP>
                );
            }
        }

        const level = match[2].length;
        const headingText = match[3].trim();
        let HeadingComponent: React.ComponentType<{
            children: React.ReactNode;
        }>;

        switch (level) {
            case 1:
                HeadingComponent = TypographyH1;
                break;
            case 2:
                HeadingComponent = TypographyH2;
                break;
            case 3:
                HeadingComponent = TypographyH3;
                break;
            default:
                HeadingComponent = TypographyH4;
        }

        elements.push(
            <HeadingComponent key={elements.length}>
                {headingText}
            </HeadingComponent>
        );

        // Update lastIndex to the end of the matched heading
        lastIndex = headingRegex.lastIndex;
    }

    // If there's any trailing text after the last heading, render it as a paragraph
    if (lastIndex < content.length) {
        const remainingText = content.slice(lastIndex).trim();
        if (remainingText) {
            elements.push(
                <TypographyP key={elements.length}>{remainingText}</TypographyP>
            );
        }
    }

    return <>{elements}</>;
}
