/**
 *
 * Asynchronously loads the component for YearBook
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
