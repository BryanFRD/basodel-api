const isAdmin = (user) => user.role?.level > 500;

const config = {
  RESTRICTED_ROUTES: {
    // 'GET/usercredential': ({user, body}) => body?.model?.id === user.id || isAdmin(user),
    'PUT/usercredential': ({user, body}) => body?.model?.id === user.id || isAdmin(user),
    'DELETE/usercredential': ({user, body}) => body?.model?.id === user.id || isAdmin(user),
    'POST/useraccount': ({user}) => isAdmin(user),
    'PUT/useraccount': ({user, body}) => body?.model?.id === user.id || isAdmin(user),
    'DELETE/useraccount': ({user, body}) => body?.model?.id === user.id || isAdmin(user)
  }
}

module.exports = config;