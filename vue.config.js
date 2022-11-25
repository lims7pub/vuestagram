module.exports = {
    pwa: {
      name: '아놀쟈',
      themeColor: '#4DBA87',
      msTileColor: '#000000',
      workboxOptions: {
        exclude: [/\.map$/, /manifest\.json$/, 'index.html']
      }
    }
  }