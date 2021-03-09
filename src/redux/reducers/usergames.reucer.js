const userGamesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_GAMES':
            return action.payload;
        case 'SET_EDIT_GAMES':
            return action.payload
        default:
            return state;
    }
};

module.exports = userGamesReducer;
