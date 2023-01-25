import type { ParsedStyleSheet } from "../types";
var css = require('css');

export const loadStylesheets = async function () {
    const stylesheetsLinks = Array.from(document.querySelectorAll("link[rel='stylesheet']")).map(el => el.getAttribute('href'));
    const stylesheets: ParsedStyleSheet[] = [];
    const styleTags = Array.from(document.querySelectorAll("style")).map(e => e.innerHTML);

    for (const stylesheetLink of stylesheetsLinks) {
        if (!stylesheetLink) continue

        let response = await fetch(stylesheetLink)
        let text = await response.text();
        stylesheets.push(css.parse(text))
    }
    
    for (const styleTag of styleTags) {
        console.log("process", styleTag, css.parse(styleTag))
        stylesheets.push(css.parse(styleTag))
    }

    let result: any = {};
    stylesheets.forEach(({stylesheet}) => {
        const process = stylesheet.rules.reduce((acc, rule) => {
            if (rule.type === 'rule') {
                const declarations = rule.declarations?.map(declaration => `${declaration.property}: ${declaration.value}`)
                rule.selectors?.forEach(selector => {
                    if (selector) {
                        // @ts-ignore:next-line
                        acc[selector] = declarations;
                    }
                })
            }
            return acc
        }, {});
        result = {...result, ...process}
    })
    return result;
}

export const enableHover = () => {
    let prev: HTMLElement | null | undefined  = null;
    document.body.addEventListener('mouseover', event => {
        if (event.target === document.body ||
            (prev && prev === event.target)) {
            return;
        }
        if (prev) {
            if (onExit) onExit(prev)
            try {
                prev.className = prev.className.replace(/\h3-outline\b/, '');
                prev = undefined;
            } catch (err) {

            }
        }
        if (event.target) {
            if (onHover) onHover(event.target as HTMLElement)
            try {
                prev = event.target as HTMLElement;
                prev.className += " h3-outline";
            } catch (err) {

            }
        }
    }, false);

    function onExit(element: HTMLElement) {
    }
    function onHover(element: HTMLElement) {
    }
}