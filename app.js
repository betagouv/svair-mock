const path = require('path'),
      express = require('express'),
      morgan = require('morgan'),
      handlebars = require('express-handlebars'),
      bodyParser = require('body-parser'),
      Import = require('./data')

const app = express()

app.engine('.hbs', handlebars({ defaultLayout: 'single', extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.redirect('/secavis')
})

app.get('/secavis', function (req, res) {
  res.render('missing', { title: 'Bienvenue sur le service de vérification des avis' })
})

app.post('/secavis/faces/commun/index.jsf', function (req, res) {
  const numFiscal = req.body['j_id_7:spi'] || ''
  const referenceAvis = req.body['j_id_7:num_facture'] || ''

  if (numFiscal.length > 0 && referenceAvis.length > 0) {
    const dataImport = new Import(__dirname + '/data')

    return dataImport.data().then((data) => {
      const result = data[`${numFiscal}+${referenceAvis}`]

      if (result) {
        res.render('svair', Object.assign(result, { title: 'L\'administration fiscale certifie l\'authenticité du document présenté pour les données suivantes :' }))
      } else {
        res.render('missing', { nonTrouve: true, title: 'Bienvenue sur le service de vérification des avis' })
      }
    })
  } else {
    res.render('missing', { identifiantsVides: true, title: 'Bienvenue sur le service de vérification des avis' })
  }
})

module.exports = app
