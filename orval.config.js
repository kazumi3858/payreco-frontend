module.exports = {
  payreco: {
    output: {
      mode: "tags-split",
      target: "src/api/endpoints.ts",
      schemas: "src/api/model",
      client: "react-query",
      mock: true,
      override: {
        useDates: true,
        mutator: {
          path: "./src/api/custom-instance.ts",
          name: "customInstance",
        },
        query: {
          options: {
            staleTime: Infinity,
          },
        },
      },
    },
    input: {
      target: "./../backend/openapi.yml",
    },
  },
};
