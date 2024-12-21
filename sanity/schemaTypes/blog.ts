export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title of Blog',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug of Blog',
      options: {
        source: 'title',
      },
    },
    {
      name: 'titleImage',
      type: 'image',
      title: 'Title Image',
    },
    {
      name: 'smallDesription',
      type: 'text',
      title: 'Small Description',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
        },
      ],
    },
    {
      name: 'category',
      type: 'reference', // Reference to another document
      title: 'Category',
      to: [{type: 'category'}], // Specifies the document type this refers to
    },
  ],
}
