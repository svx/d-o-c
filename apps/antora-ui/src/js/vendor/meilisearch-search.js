/* Meilisearch integration for Antora UI */
;(function () {
  'use strict'

  function initializeMeilisearchSearch() {
    // Meilisearch configuration - use window config if available, otherwise fallback
    var config = window.meilisearchConfig || {
      host: 'http://localhost:7700',
      apiKey: 'masterKey123',
      index: 'docs'
    }

    var searchInputs = document.querySelectorAll('[data-search-input]')
    
    if (searchInputs.length === 0) {
      // Retry once after a short delay in case DOM isn't ready
      setTimeout(initializeMeilisearchSearch, 500)
      return
    }

    // Initialize search for each input
    searchInputs.forEach(function(searchInput, index) {
      initializeSearch(searchInput)
    })

  function initializeSearch(searchInput) {
    var searchContainer = searchInput.closest('.search-input-wrap') || searchInput.parentElement
    var searchResults = searchContainer.querySelector('.search-results')
    
    // Create results container if it doesn't exist
    if (!searchResults) {
      searchResults = document.createElement('div')
      searchResults.className = 'search-results'
      searchResults.style.display = 'none'
      searchContainer.appendChild(searchResults)
    }

    var searchTimeout

    function debounce(func, wait) {
      return function executedFunction() {
        var context = this
        var args = arguments
        clearTimeout(searchTimeout)
        searchTimeout = setTimeout(function() {
          func.apply(context, args)
        }, wait)
      }
    }

    function performSearch(query) {
      if (!query || query.length < 2) {
        hideResults()
        return
      }

      // Use fetch API to query Meilisearch directly
      var searchUrl = config.host + '/indexes/' + config.index + '/search'
      
      fetch(searchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + config.apiKey
        },
        body: JSON.stringify({
          q: query,
          limit: 10,
          attributesToHighlight: ['title', 'content'],
          highlightPreTag: '<mark>',
          highlightPostTag: '</mark>',
          cropLength: 150,
          attributesToCrop: ['content']
        })
      })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Search failed with status: ' + response.status)
        }
        return response.json()
      })
      .then(function(results) {
        displayResults(results.hits || [])
      })
      .catch(function(error) {
        console.error('Search error:', error)
        displayError()
      })
    }

    function displayResults(hits) {
      if (hits.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item no-results">No results found</div>'
        showResults()
        return
      }

      var html = hits.map(function(hit) {
        var title = (hit._formatted && hit._formatted.title) || hit.title || 'Untitled'
        var content = (hit._formatted && hit._formatted.content) || hit.content || ''
        var url = hit.url || '#'
        
        // Truncate content if too long
        if (content.length > 200) {
          content = content.substring(0, 200) + '...'
        }
        
        return [
          '<div class="search-result-item">',
          '<h4><a href="' + encodeHTML(url) + '">' + title + '</a></h4>',
          content ? '<p>' + content + '</p>' : '',
          '</div>'
        ].join('')
      }).join('')

      searchResults.innerHTML = html
      showResults()
    }

    function displayError() {
      searchResults.innerHTML = '<div class="search-result-item error">Search temporarily unavailable</div>'
      showResults()
    }

    function showResults() {
      searchResults.style.display = 'block'
      if (searchContainer.classList) {
        searchContainer.classList.add('is-active')
      }
    }

    function hideResults() {
      searchResults.style.display = 'none'
      if (searchContainer.classList) {
        searchContainer.classList.remove('is-active')
      }
    }

    function encodeHTML(str) {
      return str.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
    }

    // Event listeners for this search input
    searchInput.addEventListener('input', debounce(function(e) {
      performSearch(e.target.value.trim())
    }, 300))

    searchInput.addEventListener('focus', function() {
      if (searchInput.value.trim() && searchResults.children.length > 0) {
        showResults()
      }
    })

    // Hide results when clicking outside this search container
    document.addEventListener('click', function(e) {
      if (!searchContainer.contains(e.target)) {
        hideResults()
      }
    })

    // Handle escape key for this search input
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        hideResults()
        searchInput.blur()
      }
    })
  }

    console.log('Meilisearch search initialized')
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMeilisearchSearch)
  } else {
    initializeMeilisearchSearch()
  }

})()