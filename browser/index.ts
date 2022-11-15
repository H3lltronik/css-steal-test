import { createApp } from 'vue';
import type { ParsedStyleSheet } from '../types';
import App from './components/App.vue'

const el = document.createElement("div");
el.setAttribute("id", "h3-browser-app");
document.body.appendChild(el);

const app = createApp(App);
// app.use(router);
// app.use(store);
app.mount('#h3-browser-app');


var css = require('css');

(async function () {
    const stylesheetsLinks = Array.from(document.querySelectorAll("link[rel='stylesheet']")).map(el => el.getAttribute('href'));
    const stylesheets: ParsedStyleSheet[] = [];

    for (const stylesheetLink of stylesheetsLinks) {
        if (!stylesheetLink) continue

        let response = await fetch(stylesheetLink)
        let text = await response.text();
        stylesheets.push(css.parse(text))
    }

    console.log("stylesheets", stylesheets)

    const reduced = stylesheets[2].stylesheet.rules.reduce((acc, rule) => {
        if (rule.type === 'rule') {
            const declarations = rule.declarations?.map(declaration => `${declaration.property}: ${declaration.value}`)
            rule.selectors?.forEach(selector => {
                if (selector) {
                    // Object.defineProperty(acc, selector, { value: declarations, writable: false, configurable: false })
                    // @ts-ignore:next-line
                    acc[selector] = declarations;
                }
            })
        }
        return acc
    }, {});

    console.log("reduced", reduced)
    
})()
