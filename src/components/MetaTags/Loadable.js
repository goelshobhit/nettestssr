/**
 *
 * Asynchronously loads the component for MetaTags
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
