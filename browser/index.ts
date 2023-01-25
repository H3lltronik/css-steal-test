import { createApp } from 'vue';
import App from './components/App.vue'
import { enableHover, loadStylesheets } from './lib';
import { store } from './store';

const h3El = document.createElement("div");
h3El.setAttribute("id", "h3-browser-app");
document.body.appendChild(h3El);

const h3Box = document.createElement("div");
h3Box.setAttribute("id", "h3-box");
document.body.appendChild(h3Box);



const app = createApp(App);
// app.use(router);
app.use(store);
app.mount('#h3-browser-app');



(async function () {
    const styles = await loadStylesheets();
    enableHover();

    console.log("styles", styles);
    store.commit('setStyles', styles);
    Array.from(document.querySelectorAll("body *")).forEach(el => {
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            const element = e.target as HTMLElement;
            const matches = {};
            let allStyles = [];

            for (const [selector, style] of Object.entries(styles)) {
                try {
                    if ( Array.from(document.querySelectorAll(selector)).find(el => el === element ) ) {
                        // @ts-ignore:next-line
                        matches['Element'] = style;
                        allStyles.push(style);
                        console.log("style", selector, style)
                        // matches[selector] = style;
                    }
                } catch (error) {
                    // console.warn(`Not a valid selector: ${selector}`)
                }
            }
            
            allStyles = allStyles.flat();
            // @ts-ignore:next-line
            matches['Element'] = allStyles;
            console.log("allStyles", allStyles)
            store.commit('setMatchingStyles', matches);
        });
    })

})();
