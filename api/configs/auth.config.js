const isSelf = (body, user) => body?.model?.id === user.id;
const isAdmin = (user) => user.role?.level > 500;

const config = {
  RESTRICTED_ROUTES: {
    'GET/usercredential': ({user, body}) => isSelf(body, user) || isAdmin(user),
    'PUT/usercredential': ({user, body}) => isSelf(body, user) || isAdmin(user),
    'DELETE/usercredential': ({user, body}) => isSelf(body, user) || isAdmin(user),
    'POST/useraccount': ({user}) => isAdmin(user),
    'PUT/useraccount': ({user, body}) => isSelf(body, user) || isAdmin(user),
    'DELETE/useraccount': ({user, body}) => isSelf(body, user) || isAdmin(user)
  }
}

module.exports = config;