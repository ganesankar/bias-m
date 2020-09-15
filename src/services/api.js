export const apiConfig = {
  base: 'https://revit8apps.netlify.app/.netlify/functions/',
  students: {
    name: 'students',
    url: 'students-all',
    method: 'GET',
  },
  staffs: {
    name: 'staffs',
    url: 'staffs-read-all',
    method: 'GET',
  },
  pages: {
    name: 'pages',
    url: 'pages-read-all',
    method: 'GET',
  },
  semesters: {
    name: 'pages',
    url: 'subject-read-all',
    method: 'GET',
  },
  page: {
    name: 'page',
    url: 'page-read',
    method: 'GET',
    pages: {
      about: '264402239931548160',
      college: '264515910901957138',
    },
  },
  articles: {
    name: 'articles',
    url: 'articles-read-all',
    method: 'GET',
  },
  article: {
    name: 'articles',
    url: 'articles-read',
    method: 'GET',
  },
};
