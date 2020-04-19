import React, { Component } from 'react'
import Link from './Link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

// GraphQL queryを gqlで GraphQL ASTへ変換
const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`

class LinkList extends Component {
  render() {

    return (
      // FEED_QUERYを propsとして指定し <Query />を返すように設定
      <Query query={FEED_QUERY}>
        { /* 
        RenderPropsFunctionの定義。 
        FEED_QUERYの結果がこの関数に渡される。
        */}
        { ({ loading, error, data }) => {
          { /* データ取得中? */}
          if (loading) return <div>Fetching</div>
          { /* データ取得できない? */}
          if (error) return <div>Error</div>

          { /* 取得したデータ */}
          const linksToRender = data.feed.links
          return(
            <div>
              {/* 取得したデータの内容を link として 一つずつ処理 */}
              {linksToRender.map(link => <Link key={link.id} link={link} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default LinkList