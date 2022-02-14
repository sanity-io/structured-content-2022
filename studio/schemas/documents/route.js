import { LinkIcon } from '@sanity/icons'

export default {
  name: 'route',
  type: 'document',
  title: 'Routes',
  icon: LinkIcon,
  preview: {
    select: {
      title: 'seo.title',
      subtitle: 'internalTitle',
    },
  },
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    {
      name: 'internalTitle',
      type: 'string',
      title: 'Internal title',
      description: 'Used to identify a route ',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      }
    },
    {
      name: 'page',
      type: 'reference',
      title: 'Page',
      to: [{ type: 'page' }]
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'Metadata',
      description: 'For Search Engine Optimization',
      group: 'seo',
    }
  ]
}
