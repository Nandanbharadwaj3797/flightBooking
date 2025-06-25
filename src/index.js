const express = require('express');

const {serverConfig, Logger }= require('./config');
const apiRoutes = require('./routes');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api',apiRoutes);



app.listen(serverConfig.PORT, async() => {
  console.log(`Server is running on port ${serverConfig.PORT}`);

 // bad code alertAdd 
  const { sequelize } = require('./models');
  const { City, Airport } = require('./models');
  const bengaluru = await City.findByPk(8, {include: {model: Airport}});
  // console.log(bengaluru);
  // const airport = await Airport.create({name: 'Kempegowda Airport', code: 'BLR',address: "Devanahalli, Bengaluru, Karnataka 560300", cityId: 8});
  // console.log(airport);
  // const dbpairport = await bengaluru.createAirport({name: 'Huballi Airport', code: 'HBL', address: "Hubli, Karnataka 580030"});
  // console.log(dbpairport);
  // const airportsInBlr = await bengaluru.getAirports();
  // console.log(airportsInBlr);
  // const hbairport = await Airport.findByPk(3);
  // console.log(hbairport);
  // await bengaluru.removeAirports(hbairport);
  // const mumbai = await City.findByPk(2);
  // const sh = bengaluru.createAirport({name: 'CSI airport', code: 'MUM', address: "Chhatrapati Shivaji Maharaj International Airport, Mumbai, Maharashtra 400099"});
  await City.destroy({
    where: {
        id: 8
    }
  });
    
});












