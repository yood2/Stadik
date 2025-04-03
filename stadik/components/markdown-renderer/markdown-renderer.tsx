import React from 'react';
import Image from 'next/image';
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
    const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = headingRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
            const paragraphText = content.slice(lastIndex, match.index).trim();

            // Check for images within the paragraph text
            let imageMatch: RegExpExecArray | null;
            let paragraphLastIndex = 0;
            while ((imageMatch = imageRegex.exec(paragraphText)) !== null) {
                const textBeforeImage = paragraphText
                    .slice(paragraphLastIndex, imageMatch.index)
                    .trim();
                if (textBeforeImage) {
                    elements.push(
                        <TypographyP key={elements.length}>
                            {textBeforeImage}
                        </TypographyP>
                    );
                }

                const [_, altText, src] = imageMatch;
                elements.push(
                    <Image
                        key={elements.length}
                        src={src.replace('@/', '/')}
                        alt={altText}
                        width={600} // Adjust width as needed
                        height={400} // Adjust height as needed
                    />
                );

                paragraphLastIndex = imageRegex.lastIndex;
            }

            // Add any remaining text after the last image
            const remainingText = paragraphText
                .slice(paragraphLastIndex)
                .trim();
            if (remainingText) {
                elements.push(
                    <TypographyP key={elements.length}>
                        {remainingText}
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

        // Check for images within the trailing text
        let imageMatch: RegExpExecArray | null;
        let trailingLastIndex = 0;
        while ((imageMatch = imageRegex.exec(remainingText)) !== null) {
            const textBeforeImage = remainingText
                .slice(trailingLastIndex, imageMatch.index)
                .trim();
            if (textBeforeImage) {
                elements.push(
                    <TypographyP key={elements.length}>
                        {textBeforeImage}
                    </TypographyP>
                );
            }

            const [_, altText, src] = imageMatch;
            elements.push(
                <Image
                    key={elements.length}
                    src={src.replace('@/', '/')}
                    alt={altText}
                    width={600} // Adjust width as needed
                    height={400} // Adjust height as needed
                />
            );

            trailingLastIndex = imageRegex.lastIndex;
        }

        // Add any remaining text after the last image
        const finalText = remainingText.slice(trailingLastIndex).trim();
        if (finalText) {
            elements.push(
                <TypographyP key={elements.length}>{finalText}</TypographyP>
            );
        }
    }

    return <div className="space-y-4">{elements}</div>;
}
