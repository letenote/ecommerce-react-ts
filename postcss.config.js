const tailwindcss = require("tailwindcss");
module.exports = {
  plugins: [
    "postcss-preset-env",
    // require('postcss-import'),
    tailwindcss,
    require('autoprefixer'),
    // process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}
  ],
};

// module.exports = {
//   plugins: [
//     require('postcss-import'),
//     require('tailwindcss'),
//     require('autoprefixer'),
//   ]
// }