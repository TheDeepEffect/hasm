import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    from,
    InMemoryCache,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { routes } from './config/routes'
import { PrivateRoutes } from './containers/PrivateRoutes'
import { PublicRoutes } from './containers/PublicRoutes'
import { Store } from './contexts/store'
import { useAuth } from './utils/hooks/useAuth'

const App = () => {
    const { setCurrentUser } = useAuth()
    const link = createHttpLink({
        uri: '/graphql',
        credentials: 'same-origin',
    })
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) => {
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
                if (message === 'Unauthenticated User') {
                    setCurrentUser({ expiresAt: '', user: null })
                }
            })

        if (networkError) console.log(`[Network error]: ${networkError}`)
    })
    const client = new ApolloClient({
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        feed: {
                            keyArgs: false,
                            // @ts-ignore
                            merge(
                                existing,
                                incoming = [],
                                { args: { skip = 0 } }
                            ) {
                                const merged = existing ? [...existing] : []
                                for (let i = 0; i < incoming?.length; ++i) {
                                    merged[skip + i] = incoming[i]
                                }

                                return merged
                            },
                        },
                    },
                },
            },
        }),
        link: from([errorLink, link]),
        connectToDevTools: true,
    })

    return (
        <ApolloProvider client={client}>
            <Store>
                <Router>
                    <Switch>
                        {Object.keys(routes).map((key) => {
                            const value = routes[key]
                            const { isPrivate } = value
                            const SelectedRoute = isPrivate ? (
                                <PrivateRoutes {...value} key={key} />
                            ) : (
                                <PublicRoutes {...value} key={key} />
                            )
                            return SelectedRoute
                        })}
                        <Route path="*">
                            <h2>404</h2>
                        </Route>
                    </Switch>
                </Router>
            </Store>
        </ApolloProvider>
    )
}

export default App
