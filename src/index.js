import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

/*
ApolloClinetは これを通して ServerのGraphQL API に接続する
Serverの uri は以下のとおり
*/
const httpLink = createHttpLink({
  //  uri: 'http://localhost:4000'
  uri: 'https://morning-sands-20248.herokuapp.com/'
})

// ApolloClientの生成
// link先と保存領域を指定する
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

/*
propとして clientを指定し
Rootとなる Appを
ApolloProvider でラッピングする
*/
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

serviceWorker.unregister();