import { NextSeo } from 'next-seo';
import urlJoin from 'proper-url-join';
import { imageUrlFor } from '../../lib/sanity';

interface MetaTagsProps {
  title: string;
  description: string;
  image?: object;
  currentPath: string;
  noIndex?: boolean;
  rewrittenArticleSlugs?: string[];
}

export const MetaTags = ({
  title,
  description,
  image,
  currentPath,
  noIndex,
  rewrittenArticleSlugs,
}: MetaTagsProps) => {
  const isRewrittenPath =
    Array.isArray(rewrittenArticleSlugs) &&
    rewrittenArticleSlugs.includes(
      urlJoin(currentPath, { leadingSlash: false })
    );
  const canonicalPath = isRewrittenPath
    ? urlJoin('article', currentPath)
    : currentPath;
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={urlJoin('https://structuredcontent.live', canonicalPath)}
      noindex={noIndex}
      openGraph={
        image
          ? {
              images: [
                {
                  url: imageUrlFor(image)
                    .ignoreImageParams()
                    .size(1260, 630)
                    .url(),
                },
              ],
            }
          : undefined
      }
    />
  );
};
