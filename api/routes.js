const express = require('express');
const router = express.Router();
const axios = require('axios');

// ROUTE: GET /api/routes/test
// DESC: Test Route
// ACCESS: Public

router.get('/test', (req, res) => {
  res.json({
    testRoute: "This is a test route, enjoy"
  });
});

// ROUTE: /api/routes/slug/:name
// DESC: Search Kitsu API by title and return 1 result
// ACCESS: Public

router.get('/slug/:name', (req, res) => {
  axios.get(`https://kitsu.io/api/edge/anime?filter[slug]=${req.params.name}`).then(result => {
    console.log("result.data.data[0].attributes.titles", result.data.data[0].attributes.titles)
    

    if (result.data.data[0].attributes.titles) {
      Object.entries(result.data.data[0].attributes.titles).map((value, index) => {})

      if (result.data.data[0].attributes) {
        return res.json({
          animeName: result.data.data[0].attributes
        })
      } else {
        return res.json({
          noResult: "No results!"
        })
      }
    }
  }).catch(err => {
    console.log(err)
  })
});

// ROUTE: /api/routes/category/:category
// DESC: Search Kitsu API by categories and return multiple results
// ACCESS: Public

router.get('/categories/:category', (req, res) => {
  axios.get(`https://kitsu.io/api/edge/anime?filter[categories]=${req.params.category}`).then(result => {

    let categoryResult = {};
    let animeNames = [];
    let animePosters = [];

    result.data.data.map((value, index) => {
      let imageValue = value.attributes.posterImage.original
      let nameValue = value.attributes.slug;

      animePosters.push(imageValue);
      animeNames.push(nameValue);
    })

    categoryResult.animeNames = animeNames;
    categoryResult.animePosters = animePosters;

    return res.json({
      categoryResult: categoryResult
    })
  }).catch(err => {
    console.log(err)
  })
});

// ROUTE: /api/routes/name/:name
// DESC: Search Kitsu API by title and return 1 result
// ACCESS: Public

// router.get('/name/:name', (req, res) => {
//   axios.get(`https://kitsu.io/api/edge/anime?${req.params.name}`).then(result => {
//     console.log("result.data.data[0].attributes.titles", result.data.data[0].attributes.titles)

//     if (result.data.data[0].attributes.titles) {

//       Object.entries(result.data.data[0].attributes.titles).map((value, index) => {
//         console.log("value[i]", value[1].toLowerCase());
//         console.log("SEARCH PARAMS", req.params.name)
//       })

//       return res.json({
//         animeName: result.data.data[0].attributes
//       })

//       if (result.data.data[0].attributes === undefined) {
//         return res.json({
//           noResult: "No results!"
//         })
//       }

//     }

//   }).catch(err => {
//     console.log(err)
//   })
// });

module.exports = router;