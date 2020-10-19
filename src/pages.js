const Database = require("./database/db");
const saveOrphanage = require("./database/save-orphanage");
const geolocation = require("./geolocation/geolocate");

module.exports = {
  index(req, res) {
    return res.render("index");
  },
  async orphanage(req, res) {
    const id = req.query.id;

    try {
      const db = await Database;
      const results = await db.all(
        `SELECT * FROM orphanages WHERE id = "${id}"`
      );
      const orphanage = results[0];
      orphanage.images = orphanage.images.split(",");
      orphanage.firstImage = orphanage.images[0];

      orphanage.open_on_weekends == "0"
        ? (orphanage.open_on_weekends = false)
        : (orphanage.open_on_weekends = true);
      return res.render("orphanage", { orphanage });
    } catch (error) {
      console.log(error);
      res.send("Erro no banco de dados!");
    }
  },
  async orphanages(req, res) {
    if (req.query.address) {
      try {
        const db = await Database;
        const orphanages = await db.all("SELECT * FROM orphanages");
        const address = req.query.address;
        const latLngFocus = await geolocation(address);
        return res.render("orphanages", { orphanages, latLngFocus });
      } catch (err) {
        console.log("Houve um erro: " + err);
        return res.send("Erro!" + err);
      }
    } else {
      try {
        const db = await Database;
        const orphanages = await db.all("SELECT * FROM orphanages");
        return res.render("orphanages", { orphanages });
      } catch (error) {
        console.log("Error: " + error);
        return res.send("Erro!" + error);
      }
    }
  },
  async createOrphanage(req, res) {
    return res.render("create-orphanage");
  },
  async saveOrphanage(req, res) {
    const fields = req.body;

    //validar se os campos estão preenchidos
    if (Object.values(fields).includes("")) {
      return res.send("Todos os campos devem ser preenchidos!");
    }

    try {
      //salvar um orfanato
      const db = await Database;
      await saveOrphanage(db, {
        lat: fields.lat,
        lng: fields.lng,
        name: fields.name,
        about: fields.about,
        whatsapp: fields.whatsapp,
        images: fields.images.toString(),
        instructions: fields.instructions,
        opening_hours: fields.opening_hours,
        open_on_weekends: fields.open_on_weekends,
      });
      //redirecionamento
      return res.redirect("/orphanages");
    } catch (error) {
      console.log(error);
      return res.send("Erro no banco de dados!");
    }
  },
};
