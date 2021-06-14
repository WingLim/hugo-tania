import Fuse from '../js/fuse'

declare global {
  interface Window { 
    fuse: any;
    filterSelect: any;
  }
}

let show = function (elem: HTMLElement) {
  elem.style.display = 'block';
};

let hide = function (elem: HTMLElement) {
  elem.style.display = 'none';
};

let initFuse = function () {
  const fuseOptions = {
      shouldSort: true,
      threshold: 0.3,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      useExtendedSearch: true,
      keys: [
          { name: "title", weight: 0.8 },
          { name: "contents", weight: 0.5 },
          { name: "tags", weight: 0.3 },
          { name: "categories", weight: 0.3 }
      ]
  };

  fetch('/index.json')
  .then(function (response) {
      if (response.status !== 200) {
          console.error('[' + response.status + ']Error:', response.statusText);
          return;
      }
      response.json().then(function (pages) {
          let fuse = new Fuse(pages, fuseOptions);
          window.fuse = fuse;
      })
      
  })
  .catch(function (err) {
      console.error('[Fetch]Error:', err);
  });
}
initFuse();

const searchInput = document.getElementById('search-query') as HTMLInputElement;
const searchResults = document.getElementById('search-results');
const articlesList = document.getElementById('articles-list');
if (searchInput != undefined) {
  searchInput.addEventListener("input", function () {
      let value = searchInput.value;
      executeSearch(buildSearchValue(value));
  })
}

let searchFilter = new Map();
let buildSearchValue = function(value: string) {
  let filter = [];
  if (searchFilter.size == 0 && value.length == 0) {
      return "";
  }
  searchFilter.forEach((v: string, k: string) => {
      let object = {};
      if (v == "categories") {
          object = {
              categories: k
          }
      }
      filter.push(object);
  })
  if (value != undefined && value.length != 0) {
      let orObject = {
          $or: [
              {title: value},
              // fuse extended search, 'value is include-match
              // more details: https://fusejs.io/examples.html#extended-search
              {contents: "'"+value}
          ]
      }
      filter.push(orObject);
  }
  return {
      $and: filter
  }
}

let filterSelect = function(element: HTMLElement) {
  let value = element.dataset.value;
  let type = element.dataset.type;
  if (element.classList.contains('active')) {
      searchFilter.delete(value);
      element.classList.remove('active');
  } else {
      searchFilter.set(value, type);
      element.classList.add('active');
  }
  executeSearch(buildSearchValue(""));
}
window.filterSelect = filterSelect;

let executeSearch = function(value: string|object) {
  if ((typeof value === "string" && value.length != 0) || typeof value === "object") {
      hide(articlesList);
      show(searchResults);
  } else {
      hide(searchResults);
      show(articlesList);
  }

  let result = window.fuse.search(value);
  if (result.length > 0) {
      populateResults(result);
  } else {
      searchResults.innerHTML = '<p>Sorry, nothing matched that search.</p>';
  }

  interface searchItem {
    item: {
      categorise: Array<string>,
      contents: string,
      date: string,
      permalink: string,
      tags: Array<string>,
      title: string
    },
    refIndex: number
  }

  function populateResults(results: Array<searchItem>) {
      searchResults.innerHTML = "";

      results.forEach(function (value) {
          let item = value.item
          let html = `
          <div class="post">
              <a href="${item.permalink}">
                  <div class="post-row">
                      <time>${item.date}</time>
                      <h3>${item.title}</h3>
                  </div>
              </a>
          </div>`
          searchResults.innerHTML += html;
      });
  }
}
