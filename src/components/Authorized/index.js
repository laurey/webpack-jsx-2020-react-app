import Authorized from './Authorized';
// import AuthorizedRoute from './AuthorizedRoute';
import Secured from './Secured';
import check from './CheckPermissions';
import renderAuthorize from './renderAuthorize';

Authorized.Secured = Secured;
// Authorized.AuthorizedRoute = AuthorizedRoute;
Authorized.check = check;

const RenderAuthorized = renderAuthorize(Authorized);

export default RenderAuthorized;
