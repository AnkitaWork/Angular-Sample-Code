const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
    const files =[
         './dist/sales-site-reviews/runtime.js',
        './dist/sales-site-reviews/polyfills.js',
        './dist/sales-site-reviews/main.js'
    ]
    await fs.ensureDir('elements')
    await concat(files, 'elements/sales-site-custom-elements.js')
    console.info('Elements created successfully!')
})()