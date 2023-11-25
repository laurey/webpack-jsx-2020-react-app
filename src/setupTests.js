import '@testing-library/jest-dom';

// import '@testing-library/react/cleanup-after-each';
// import '@testing-library/jest-dom/extend-expect';

// require('jest-fetch-mock').enableMocks();

const fakeData = [{ id: 1 }, { id: 3 }, { id: 5 }];
global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
        json: () => Promise.resolve(fakeData)
    })
);
