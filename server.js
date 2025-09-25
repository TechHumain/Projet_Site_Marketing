const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const userName = req.cookies.userName;
  res.locals.user = userName ? { name: userName } : null;
  res.locals.currentPath = req.path;
  next();
});

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Votre solution marketing',
  });
});

app.get('/dashboard', (req, res) => {
  if (!res.locals.user) {
    return res.redirect('/login');
  }

  res.render('dashboard', {
    title: 'Tableau de bord',
  });
});

app.get('/account', (req, res) => {
  if (!res.locals.user) {
    return res.redirect('/login');
  }

  res.render('account', {
    title: 'Mon compte',
  });
});

app.get('/login', (req, res) => {
  if (res.locals.user) {
    return res.redirect('/dashboard');
  }

  res.render('login', {
    title: 'Connexion',
  });
});

app.post('/auth/mock', (req, res) => {
  res.cookie('userName', 'Jean Dupont', {
    httpOnly: false,
    sameSite: 'lax',
  });
  res.redirect('/dashboard');
});

app.post('/logout', (req, res) => {
  res.clearCookie('userName');
  res.redirect('/');
});

app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page introuvable',
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

module.exports = app;
