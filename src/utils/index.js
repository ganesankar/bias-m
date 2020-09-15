export const getImgPlaceHolder = (name) => {
  let userIcon =
    'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTI4cHgiIGhlaWdodD0iMTI4cHgiPgo8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzFfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjI1NiIgeTE9IjUxNCIgeDI9IjI1NiIgeTI9IjIiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLTEgMCA1MTQpIj4KCTxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzJBRjU5OCIvPgoJPHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojMDA5RUZEIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxwYXRoIHN0eWxlPSJmaWxsOnVybCgjU1ZHSURfMV8pOyIgZD0iTTQzNy4wMiwzMzAuOThjLTI3Ljg4My0yNy44ODItNjEuMDcxLTQ4LjUyMy05Ny4yODEtNjEuMDE4ICBDMzc4LjUyMSwyNDMuMjUxLDQwNCwxOTguNTQ4LDQwNCwxNDhDNDA0LDY2LjM5MywzMzcuNjA3LDAsMjU2LDBTMTA4LDY2LjM5MywxMDgsMTQ4YzAsNTAuNTQ4LDI1LjQ3OSw5NS4yNTEsNjQuMjYyLDEyMS45NjIgIGMtMzYuMjEsMTIuNDk1LTY5LjM5OCwzMy4xMzYtOTcuMjgxLDYxLjAxOEMyNi42MjksMzc5LjMzMywwLDQ0My42MiwwLDUxMmg0MGMwLTExOS4xMDMsOTYuODk3LTIxNiwyMTYtMjE2czIxNiw5Ni44OTcsMjE2LDIxNmg0MCAgQzUxMiw0NDMuNjIsNDg1LjM3MSwzNzkuMzMzLDQzNy4wMiwzMzAuOTh6IE0xNDgsMTQ4YzAtNTkuNTUyLDQ4LjQ0OS0xMDgsMTA4LTEwOHMxMDgsNDguNDQ4LDEwOCwxMDhzLTQ4LjQ0OSwxMDgtMTA4LDEwOCAgUzE0OCwyMDcuNTUyLDE0OCwxNDh6Ii8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=';

  const arrn = name.trim();
  let nmim = '';
  const arr = arrn.split(' ');
  if (arr.length > 1) {
    for (let i = 0; i < 2; i += 1) {
      nmim += arr[i].substring(0, 1).toUpperCase();
    }
  } else {
    nmim = arrn.substring(0, 2).toUpperCase();
  }
  if (nmim.length > 0) {
    return `https://via.placeholder.com/300/222831/19d3bf/?text=${nmim}`;
  }
  return userIcon;
};

export const get50Char = (str) => {
  const strp = str.replace(/<[^>]*>/g, '');
  if (strp.length > 100) {
    return `${strp.substring(0, 100)}...`;
  }
  return strp;
};

export const domTagByField = (i) => {
  switch (i.field) {
    case 'sName':
      return `<h2 class="h2">${i.val}</h2>`;
    case 'sDesc':
      return `<p>${i.val}</p>`;
    case 'sCord':
      return `<p>${i.val}</p>`;
    default:
      return `<p>${i.val}</p>`;
  }
};
