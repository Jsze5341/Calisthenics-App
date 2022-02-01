import { createGlobalState } from 'react-hooks-global-state';

//Global state that contains the logged in user's username.
//Empty when a user is not logged in
const { setGlobalState, useGlobalState } = createGlobalState({
    loggedInUser: '',
    favDeleted: false,
});

export const setErrorMessage = (s: string) => {
    setGlobalState('loggedinUser', s);
};

export const setFavErrorMessage = (s: string) => {
    setGlobalState('favDeleted', s);
};

export { useGlobalState };