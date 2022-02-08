export default {
  name: 'post',
  type: 'document',
  title: 'Posts',
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
      description: 'Used to identify a post ',
    },
    {
      name: 'twitter',
      type: 'string',
      title: 'Twitter',
      // Validate if handle is included in the string
      validation: (Rule) => Rule.custom(value => {
        if (value.startsWidth('@')) {
          return true
        }
        return 'Twitter handle is required'
      })
    }
  ]
}