// create history
import { createBrowserHistory } from 'history';

export function createHistory(opts) {
    const history = createBrowserHistory(opts);
    return history;
}
const history = createHistory({
    basename: process.env.ROUTER_BASE ?? '/'
});
export default history;
