import React from 'react';
/* eslint-disable no-undef, no-underscore-dangle, id-match, id-length */
export default class Search extends React.Component {

  showSearchField() {
    function renderSearchElement() {
      google.search.cse.element.render(
        {
          div: 'default',
          tag: 'searchbox-only',
          attributes: {
            enableHistory: true,
            noResultsString: `Your query returned no results. Please try a
            different search term. (Did you check your spelling? You can also
              try rephrasing your query or using more general search terms.)`,
            newWindow: false,
            gname: 'economist-search',
            queryParameterName: 'ss',
            language: 'en',
            resultsUrl: '/search/',
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

    window.__gcse = {
      parsetags: 'explicit',
      callback: myCallback,
    };

    const cx = '013751040265774567329:pqjb-wvrj-q';
    const gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
    const protocol = (document.location.protocol === 'https:' ? 'https:' : 'http:');
    gcse.src = `${protocol}//www.google.com/cse/cse.js?cx=${cx}`;
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  }

  render() {
    return (<div>
              <button type="button" onClick={this.showSearchField.bind(this)}>
                Click Me to Show Custom Search Engine!
              </button>
              <div id="default"></div>
            </div>
          );
  }
}
