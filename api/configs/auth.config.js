const config = {
  RESTRICTED_ROUTES: {
    'PUT/useraccount': ({user, body}) => {
      return body?.model?.id === user.id || user?.role?.level > 500;
    }
  }
}

module.exports = config;