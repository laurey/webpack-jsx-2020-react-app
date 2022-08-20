export function urlToList(url) {
    const urllist = url.split('/').filter(i => i);
    return urllist.map((item, index) => `/${urllist.slice(0, index + 1).join('/')}`);
}
