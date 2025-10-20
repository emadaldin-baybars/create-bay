/**
 * Component Template Generator
 */

/**
 * Generate component template content
 * @param {object} config - Component configuration
 * @param {string} config.className - Class name (PascalCase)
 * @param {string} config.cssClassName - CSS class name (kebab-case)
 * @param {boolean} config.includeState - Include state management
 * @param {boolean} config.includeLifecycle - Include lifecycle methods
 * @returns {string} Component template content
 */
export function getComponentTemplate(config) {
  const { className, cssClassName, includeState, includeLifecycle } = config;

  const stateSection = includeState
    ? `
    // Component state
    this.state = {
      count: 0
    };`
    : '';

  const lifecycleSection = includeLifecycle
    ? `
  /**
   * Called when component is created
   */
  onCreate() {
    console.log('${className} created');
  }

  /**
   * Called after component is mounted to DOM
   */
  onMount() {
    console.log('${className} mounted');
  }

  /**
   * Called before component is removed from DOM
   */
  onDestroy() {
    console.log('${className} destroyed');
    // Clean up event listeners, timers, etc.
  }
`
    : '';

  return `/**
 * ${className} Component
 * Reusable component with props and state
 */
import { Component } from '../Component.js';

export class ${className} extends Component {
  constructor(props = {}) {
    super({
      // Default props
      title: 'Default Title',
      variant: 'default',
      ...props
    });
${stateSection}
  }

  /**
   * Render component HTML
   * @returns {string} HTML content
   */
  render() {
    const { title, variant } = this.props;${includeState ? '\n    const { count } = this.state;' : ''}

    return \`
      <div class="${cssClassName} ${cssClassName}--\${variant}" data-component="${cssClassName}">
        <div class="${cssClassName}__header">
          <h3 class="${cssClassName}__title">\${this.escapeHTML(title)}</h3>
        </div>

        <div class="${cssClassName}__content">
          ${includeState ? '<p>Count: ${count}</p>' : '<p>Component content here</p>'}
        </div>

        ${includeState ? `<div class="${cssClassName}__actions">
          <button class="${cssClassName}__btn" data-action="increment">Increment</button>
        </div>` : ''}
      </div>
    \`;
  }

  /**
   * Attach event listeners after mounting
   */
  attachEventListeners() {${includeState ? `
    const btn = this.element.querySelector('[data-action="increment"]');

    if (btn) {
      btn.addEventListener('click', () => {
        this.setState({ count: this.state.count + 1 });
      });
    }` : `
    // Add event listeners here
    // Example:
    // const btn = this.element.querySelector('.${cssClassName}__btn');
    // btn?.addEventListener('click', () => { ... });`}
  }
${lifecycleSection}}
`;
}

/**
 * Generate component CSS template
 * @param {string} cssClassName - CSS class name (kebab-case)
 * @returns {string} CSS content
 */
export function getComponentCssTemplate(cssClassName) {
  return `/* ${cssClassName} Component Styles */

.${cssClassName} {
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: white;
}

.${cssClassName}__header {
  margin-bottom: 1rem;
}

.${cssClassName}__title {
  margin: 0;
  color: var(--primary-color);
  font-size: 1.25rem;
}

.${cssClassName}__content {
  margin: 1rem 0;
  color: var(--text-color);
}

.${cssClassName}__actions {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.${cssClassName}__btn {
  padding: 0.5rem 1rem;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
}

.${cssClassName}__btn:hover {
  background-color: #45a049;
}

/* Variants */
.${cssClassName}--primary {
  border-color: var(--accent-color);
}

.${cssClassName}--secondary {
  border-color: var(--secondary-color);
}

.${cssClassName}--outlined {
  background-color: transparent;
}

.${cssClassName}--elevated {
  box-shadow: var(--shadow-lg);
  border: none;
}
`;
}
