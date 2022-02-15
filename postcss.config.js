const tailwindcss = require("tailwindcss");
module.exports = {
  plugins: [
    require("postcss-preset-env"),
    // require('postcss-import'),
    require("tailwindcss"),
    require('autoprefixer'),
    // ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  ],
};

// module.exports = {
//   plugins: [
//     require('postcss-import'),
//     require('tailwindcss'),
//     require('autoprefixer'),
//   ]
// }