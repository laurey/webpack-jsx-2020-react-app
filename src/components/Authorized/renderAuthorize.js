let CURRENT = 'NULL';

/**
 * use  authority or getAuthority
 * @param {string|()=>String} currentAuthority
 */
const renderAuthorize = Authorized => currentAuthority => {
    if (currentAuthority) {
        if (typeof currentAuthority === 'function') {
            CURRENT = currentAuthority();
        }
        if (Object.prototype.toString.call(currentAuthority) === '[object String]' || Array.isArray(currentAuthority)) {
            CURRENT = currentAuthority;
        }
    } else {
        CURRENT = 'NULL';
    }
    return Authorized;
};

export { CURRENT };
const renderAuth = Authorized => renderAuthorize(Authorized);
export default renderAuth;
