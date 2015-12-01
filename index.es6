import React from 'react';
import Icon from '@economist/component-icon';
import Loading from '@economist/component-loading';
import promisescript from 'promisescript';
/* eslint-disable no-undef, no-underscore-dangle, id-match, id-length */
export default class Search extends React.Component {

  static get propTypes() {
    return {
      enableHistory: React.PropTypes.bool,
      noResultsString: React.PropTypes.string,
      newWindow: React.PropTypes.bool,
      gname: React.PropTypes.string,
      queryParameterName: React.PropTypes.string,
      language: React.PropTypes.string,
      resultsUrl: React.PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      enableHistory: true,
      noResultsString: `Your query returned no results. Please try a
      different search term. (Did you check your spelling? You can also
        try rephrasing your query or using more general search terms.)`,
      newWindow: false,
      gname: 'economist-search',
      queryParameterName: 'ss',
      language: 'en',
      resultsUrl: 'http://www.economist.com/search/',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      javascritEnabled: true,
      statusClassName: 'search--close',
      searchTerm: '',
    };
  }

  componentDidMount() {
    this.hideNoJSForm();
  }

  showSearchFieldHandler(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      statusClassName: 'search--loading',
    });
    return this.ensureScriptHasLoaded().then(() => (
      this.setState({
        statusClassName: 'search--open',
      })
    ));
  }

  clearSearchField() {
    this.setState({
      searchTerm: '',
      statusClassName: 'search--close',
    });
    document.querySelector('.search input.gsc-input').value = '';
  }

  ensureScriptHasLoaded() {
    const self = this;
    function renderSearchElement() {
      google.search.cse.element.render(
        {
          div: 'google-search-box',
          tag: 'searchbox-only',
          attributes: {
            enableHistory: self.props.enableHistory,
            noResultsString: self.props.noResultsString,
            newWindow: self.props.newWindow,
            gname: self.props.gname,
            queryParameterName: self.props.queryParameterName,
            language: self.props.language,
            resultsUrl: self.props.resultsUrl,
          },
        });
    }

    function myCallback() {
      if (document.readyState === 'complete') {
        renderSearchElement();
      } else {
        google.setOnLoadCallback(renderSearchElement, true);
      }
    }

    if (!this.script) {
      window.__gcse = {
        parsetags: 'explicit',
        callback: myCallback,
      };
      const cx = '013751040265774567329:pqjb-wvrj-q';
      const protocol = (document.location.protocol) === 'https:' ? 'https:' : 'http:';
      const src = `${protocol}//www.google.com/cse/cse.js?cx=${cx}`;
      this.script = promisescript({
        url: src,
        type: 'script',
      }).catch((e) => {
        console.error('An error loading or executing Google Custom Search: ', e.message);
      });
    }
    return this.script;
  }

  hideNoJSForm() {
    this.setState({
      javascritEnabled: true,
    });
  }

  render() {
    return (<div className={`search ${this.state.statusClassName}`}>
              <div className="search__show-field-group">
                <a className="search__magnifier"
                  onClick={this.showSearchFieldHandler.bind(this)}
                  href={this.props.resultsUrl}
                >
                  <Icon icon="magnifier"
                    color="white"
                    size="28"
                  />
                </a>
                <div className="search__search-box" id="google-search-box"></div>
                <a className="search__search-label"
                  onClick={this.showSearchFieldHandler.bind(this)}
                  href={this.props.resultsUrl}
                >
                  Search
                </a>
                <div className="search__preloader"><Loading /></div>
                <a className="search__search-close"
                  onClick={this.clearSearchField.bind(this)}
                >
                  <Icon
                    icon="close"
                    size="28"
                  />
                </a>
              </div>
            </div>
          );
  }
}
