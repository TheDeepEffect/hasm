import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    from,
    InMemoryCache,
    split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { routes } from './config/routes';
import { PrivateRoutes } from './containers/PrivateRoutes';
import { PublicRoutes } from './containers/PublicRoutes';
import { Store } from './contexts/store';
import { useAuth } from './utils/hooks/useAuth';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const App = () => {
    const { setCurrentUser } = useAuth();
    const wssLink = new WebSocketLink({
        // uri: 'wss://jasm-apollo-server.herokuapp.com/graphql',
        uri: 'ws://localhost:4000/graphql',
        options: {
            reconnect: true,
        },
    });
    const link = createHttpLink({
        uri: '/graphql',
        credentials: 'same-origin',
    });
    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wssLink,
        link
    );
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) => {
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                );
                if (message === 'Unauthenticated User') {
                    setCurrentUser({ expiresAt: '', user: null });
                }
            });

        if (networkError) console.log(`[Network error]: ${networkError}`);
    });
    const client = new ApolloClient({
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        feed: {
                            keyArgs: false,
                            merge(
                                existing,
                                incoming = [],
                                // @ts-ignore
                                { args: { skip = 0 } }
                            ) {
                                const merged = existing ? [...existing] : [];
                                for (let i = 0; i < incoming?.length; ++i) {
                                    merged[skip + i] = incoming[i];
                                }

                                return merged;
                            },
                        },
                    },
                },
            },
        }),
        link: from([errorLink, splitLink]),
        connectToDevTools: true,
    });

    return (
        <ApolloProvider client={client}>
            <Store>
                <Router>
                    <Switch>
                        {Object.keys(routes).map((key) => {
                            const value = routes[key];
                            const { isPrivate } = value;
                            const SelectedRoute = isPrivate ? (
                                <PrivateRoutes {...value} key={key} />
                            ) : (
                                <PublicRoutes {...value} key={key} />
                            );
                            return SelectedRoute;
                        })}
                        <Route path="*">
                            <h2>404</h2>
                        </Route>
                    </Switch>
                </Router>
            </Store>
        </ApolloProvider>
    );
};

export default App;
