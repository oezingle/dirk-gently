import { createRequire } from 'module';
const require = createRequire(import.meta.url);

require('svelte/register');

/**
 * This is the greatest work any human has ever created.
 * It is also capable of crashing the server
 */

/**
 * Render a svelte component as pure HTML (if possible)
 *
 * @param componentPath the path to the given component, relative to util/renderHTML.ts
 * @param props properties object for the component
 * @returns html as string
 */
const renderHTML = async (componentPath: string, props) => {
        const normalizedPath = componentPath.replace('$lib', '..');

        const module = await import(normalizedPath);

        if (!module.default) throw new Error('No default export');

        const component = module.default;

        const { html } = component.render(props);

        return html;
};

export const renderHTMLSafe = (componentPath: string, props) => {
        return renderHTML(componentPath, props)
                .catch(err => console.error(err))
}

export default renderHTML;