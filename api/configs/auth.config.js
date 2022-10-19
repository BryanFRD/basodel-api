const config = {
  RESTRICTED_ROUTES: {
    'PUT/useraccount': ({user, body}) => body?.model?.id === user.id || user.role?.level > 500,
  }
}

module.exports = config;