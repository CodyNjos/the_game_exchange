const userGamesReducer = require("../redux/reducers/usergames.reucer")

test('Without an action, the reducer will return an empty array', () => {
    const testResult = userGamesReducer(undefined,{});
    expect(typeof (testResult)).toBe('object')
    expect(testResult.length).toBe(0)
}) 

test('Given action SET_USER_GAMES, reducer will return the payload', () => {
    const testResult = userGamesReducer([], {type:'SET_USER_GAMES', payload: [{ id:1, name:'test_name', photo:'test_photo', details:'test_details'  }]});
    expect(typeof testResult).toBe('object')
    expect(testResult.length).toBe(1);
    expect(testResult[0].id).toBe(1)
    expect(testResult[0].name).toBe('test_name')
    expect(testResult[0].photo).toBe('test_photo')
    expect(testResult[0].details).toBe('test_details')
} )