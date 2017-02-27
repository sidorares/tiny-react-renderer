/***
 * Welcome to the Tiny React Renderer on Fiber.
 *
 * The Reconciler API for the current targeted revision is available at:
 * https://github.com/facebook/react/blob/ca4325e3eff16b86879188eb996ebcc9a933336a/src/renderers/shared/fiber/ReactFiberReconciler.js#L48-L104
 *
 * A renderer is created by passing an object that conforms to this shape into
 * require('ReactFiberReconciler')(hostConfig: HostConfig) and receives back a
 * Reconciler. You then create your *renderer* API through calling methods of
 * the reconciler.
 *
 * These types are copied into `../react-types` for the current revision
 * (16.0.0-alpha.3).
 *
 * @flow
 */

'use strict';

/**
 * The two internal types you need to be aware of. Everything else should be
 * kept private except host-specific things that you handle in your renderer.
 */
import type { HostConfig, Reconciler } from 'react-fiber-types';
import type { ReactNodeList } from 'react-fiber-types/ReactTypes';

// our renconciler types are defined in ./ReactTinyTypes.js for a convenient place to see
// what types you’re expected to define when implementing a renderer
import type { Props } from './ReactTinyTypes';


/**
 * This is the only entry point you need to create a Fiber renderer. Note that
 * it currently lives within the `react-dom` package and not `react.
 */
const ReactFiberReconciler : (
  hostConfig: HostConfig<*, *, *, *, *, *, *, *>
) => Reconciler<*, *, *> = require('react-dom/lib/ReactFiberReconciler');

/**
 * The fun begins!
 *
 * We create a private reconciler instance. The methods defined here can be
 * thought of as the lifecycle of a renderer. React will manage all non-host
 * components, such as composites, stateless, and fragments.
 */
const TinyRenderer = ReactFiberReconciler({
  shouldSetTextContent(props : Props) : boolean {
    return false
  }
});

/**
 * Our public renderer. When someone requires your renderer, this is all they
 * should have access to. `render` and `unmountComponentAtNode` methods should
 * be considered required, though that isn’t strictly true.
 */
const Tiny = {
  render(
    element : React$Element<any>,
    container : any,
    callback : ?Function
  ) {
    let root = roots.get(container);
    if (!root) {
      root = TinyRenderer.createContainer(container);
      roots.set(container, root);
    }

    TinyRenderer.updateContainer((element : any), root, null, callback);
  },
  unmountComponentAtNode(container : any) {
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

