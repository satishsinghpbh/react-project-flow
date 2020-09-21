// @flow

// Note: Entity Types can be found in ../decls/types.js and are imported in ../.flowconfig

import * as React from 'react';

const ARTICLES = [
  { id: '0', title: 'How to fetch data in React0', url: '/abc/xyz' },
  { id: '1', title: 'How to fetch data in React1', url: '/abc/xyz' },
  { id: '2', title: 'How to fetch data in React2', url: '/abc/xyz' },
  { id: '3', title: 'How to fetch data in React3', url: '/abc/xyz' },
  { id: '4', title: 'How to fetch data in React4', url: '/abc/xyz' },
  { id: '5', title: 'How to fetch data in React5', url: '/abc/xyz' },
  { id: '6', title: 'How to fetch data in React6', url: '/abc/xyz' },
  { id: '7', title: 'How to fetch data in React7', url: '/abc/xyz' },
  { id: '8', title: 'How to fetch data in React8', url: '/abc/xyz' },
  { id: '9', title: 'How to fetch data in React9', url: '/abc/xyz' },
  { id: '10', title: 'How to fetch data in React10', url: '/abc/xyz' },
  { id: '11', title: 'How to fetch data in React11', url: '/abc/xyz' },
];

type AppProps = {

};

type AppState = {
  searchTerm: string,
};

const applyFilter = (searchTerm: string): Function => (article: ArticleEntity): boolean =>
  article.title.toLowerCase().includes(searchTerm.toLowerCase());

const applySearchTerm = (searchTerm: string): Function => () => ({
  searchTerm,
});

class App extends React.Component<AppProps, AppState> {
  constructor() {
    super();

    this.state = {
      searchTerm: '',
    };

    (this:any).onSearch = this.onSearch.bind(this);
  }

  onSearch(event: SyntheticInputEvent<HTMLInputElement>) {
    const { value } = event.target;

    this.setState(applySearchTerm(value));
  }

  render() {
    const { searchTerm } = this.state;

    return (
      <div>
        <Search value={searchTerm} onSearch={this.onSearch}>
          <p>Search</p>
        </Search>

        <Articles articles={ARTICLES.filter(applyFilter(searchTerm))} />

        <p>Found in <a href="https://reactjs.org/docs/getting-started.html">the Road to learn React</a></p>
      </div>
    );
  }
}

type SearchProps = {
  value: string,
  onSearch: Function,
  children: React.Element<any> | string,
};

function Search({ value, onSearch, children }: SearchProps) {
  return (
    <div>
      {children} <input
        value={value}
        onChange={onSearch}
        type="text"
      />
    </div>
  );
}

type ArticlesProps = {
  articles: ArticlesEntity,
};

function Articles({ articles }: ArticlesProps) {
  return (
    <ul>
      {articles.map(article =>
        <li key={article.id}>
          <Article article={article} />
        </li>
      )}
    </ul>
  );
}

type ArticleProps = {
  article: ArticleEntity,
};

function Article({ article }: ArticleProps) {
  return <a href={article.url}>{article.title}</a>
}

export default App;
