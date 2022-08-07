// create history
import { createBrowserHistory } from 'history';

export function createHistory(opts) {
    const history = createBrowserHistory(opts);
    return history;
}
const history = createHistory({
    basename: window.routerBase || '/'
});
export default history;
