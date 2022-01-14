import { onError } from '@apollo/client/link/error';

import { EventBus, Events } from '@services/bus.service';

export const unauthorizedErrorLink = onError(({ graphQLErrors, operation }) => {
  const isUnauthorizedError = !!graphQLErrors?.find((gqlError) => gqlError?.extensions?.type === 'UNAUTHENTICATED');

  if (isUnauthorizedError && operation.operationName !== 'AuthHookViewer') {
    EventBus.emit(Events.UnauthorizedError);
  }
});
