/***
 * Welcome to the Tiny React Renderer on Fiber.
 *
 * The Reconciler API for the current targeted revision is available at:
 * https://github.com/facebook/react/blob/c7ebe88c2a923c55448369330beaa707b96487f8/src/renderers/shared/fiber/ReactFiberReconciler.js#L47-L103
 *
 * A renderer is created by passing an object that conforms to this shape into
 * require('ReactFiberReconciler')(hostConfig: HostConfig) and receives back a
 * Renderer.
 *
 * These types are copied into `./ReactTinyFiberTypes.js` at the current revision.
 */

'use strict';

/**
 * The two internal types you need to be aware of. Everything else should be
 * kept private except host-specific things that you handle in your renderer.
 */
import type {HostConfig, Reconciler} from './ReactTinyFiberTypes';

/**
 * This is the only entry point you need to create a Fiber renderer. Note that
 * it currently lives within the `react-dom` package and not `react.
 */
const ReactFiberReconciler : (hostConfig: HostConfig) => Reconciler = require('react-dom/lib/ReactFiberReconciler');


/**
 * The fun begins!
 *
 * We create a private reconciler instance. The methods defined here can be
 * thought of as the lifecycle of a renderer. React will manage all non-host
 * components, such as composites, stateless, and fragments.
 */
const TinyRenderer = ReactFiberReconciler({

});

/**
 * Our public renderer. When someone requires your renderer, this is all they
 * should have access to. `render` and `unmountComponentAtNode` methods should
 * be considered required, though that isn’t strictly true.
 */
const Tiny = {
  render(element, container, callback) {
    let root = roots.get(container);
    if (!root) {
      root = TinyRenderer.createContainer(container);
      roots.set(container, root);
    }
    TinyRenderer.updateContainer(element, root, null, callback);
  },
  unmountComponentAtNode(container) {
    const root = roots.get(container);
    if (root) {
      TinyRenderer.updateContainer(null, root, null, () => {
        roots.delete(container);
      });
    }
  },
  // other API methods you may support, such as `renderPortal()`
};

const roots = new Map();

module.exports = Tiny;

