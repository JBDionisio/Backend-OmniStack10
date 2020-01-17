const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;
  
    let dev = await Dev.findOne({ github_username });
    if(!dev) {
      const githubResponse = await axios.get(`https://api.github.com/users/${github_username}`);
  
      const { name = login, avatar_url, bio } = githubResponse.data;
      const techsArray = parseStringAsArray(techs);
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
      
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }
  
    return response.json(dev);
  },

  async update(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;
  
    let dev = await Dev.findOne({ github_username });
    if(dev) {
      const githubResponse = await axios.get(`https://api.github.com/users/${github_username}`);
  
      const { name = login, avatar_url, bio } = githubResponse.data;
      const techsArray = parseStringAsArray(techs);
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      await Dev.updateOne(dev, {
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      dev = await Dev.findOne({ github_username });
      return response.json(dev);
    }
  
    return response.json({ error: "Desenvolvedor não cadastrado" });
  },

  async destroy() {
    //TODO: tomorrow
  },
}