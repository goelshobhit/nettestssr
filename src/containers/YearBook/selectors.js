import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the yearBook state domain
 */

const selectYearBookDomain = state => state.yearBook || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by YearBook
 */

const makeSelectYearBook = () =>
  createSelector(
    selectYearBookDomain,
    substate => substate,
  );

export default makeSelectYearBook;
export { selectYearBookDomain };
