// Meilisearch configuration - this will be loaded as a static file
window.meilisearchConfig = {
  host: 'http://localhost:7700',
  apiKey: 'masterKey123', 
  index: 'docs'
};

console.log('Meilisearch config loaded:', window.meilisearchConfig);