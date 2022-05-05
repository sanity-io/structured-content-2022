import { NextSeo } from 'next-seo';
import urlJoin from 'proper-url-join';
import { imageUrlFor } from '../../lib/sanity';
import { Figure } from '../../types/Figure';
import { productionUrl } from '../../util/constants';

interface MetaTagsProps {
  title: string;
  description: string;
  image?: Figure;
  fallbackImage: { url: string; alt: string };
  currentPath: string;
  noIndex?: boolean;
  rewrittenArticleSlugs?: string[];
}

export const MetaTags = ({
  title,
  description,
  image,
  fallbackImage,
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
  const imageUrl = image && imageUrlFor(image).size(1260, 630).url();
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={urlJoin(productionUrl, canonicalPath)}
      noindex={noIndex}
      openGraph={{
        images: [
          {
            url: imageUrl || fallbackImage.url,
            alt: (image || fallbackImage).alt,
          },
        ],
      }}
      twitter={{
        cardType: 'summary_large_image',
        site: '@sanity_io',
        handle: '@sanity_io',
      }}
    />
  );
};
