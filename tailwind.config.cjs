const config = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
  ],

  theme: {
    extend: {
      lineClamp: {
        8: '8',
      }
    }
  },

  darkMode: 'class',

  plugins: [
    require('@tailwindcss/line-clamp'),
    ...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
  ]
};

module.exports = config;
