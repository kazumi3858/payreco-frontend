module.exports = {
  payreco: {
    output: {
      mode: 'tags-split',
      target: 'src/api/endpoints.ts',
      schemas: 'src/api/model',
      client: 'react-query',
      mock: true,
      override: {
        useDates: true,
        mutator: {
          path: './src/api/mutator/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
    input: {
      target: './../backend/openapi.yml',
    },
  },
};
