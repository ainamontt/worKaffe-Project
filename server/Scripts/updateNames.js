// este archivo bc something happend w/ names in the db (csv) and didnt appear in the front so i do it manually
require("dotenv").config();
const mongoose = require("mongoose");
const Cafe = require("../models/Cafe");
console.log("valor de DB_URI:", process.env.DB_URI);

const cafesToUpdate = [
  { id: "688783ad62f73e183d44c1ee", name: "The Miners - Poblenou" },
  { id: "688783ad62f73e183d44c1ef", name: "The Miners - Sagrada Familia" },
  { id: "688783ad62f73e183d44c1f0", name: "The Miners - Hospital clinic" },

  { id: "688783ad62f73e183d44c1f1", name: "SandwiChez Aragó" },
  { id: "688783ad62f73e183d44c1f2", name: "SandwiChez Trafalgar" },
  { id: "688783ad62f73e183d44c1f3", name: "SandwiChez Av. Rep. Argentina" },
  { id: "688783ad62f73e183d44c1f4", name: "CafeSandwiChez Rocafort" },
  { id: "688783ad62f73e183d44c1f5", name: "Sants SandwiChez" },
  { id: "688783ad62f73e183d44c1f6", name: "Gracia SandwiChez" },
  { id: "688783ad62f73e183d44c1f7", name: "Federal cafe Poblenou" },
  { id: "688783ad62f73e183d44c1f8", name: "Federal Cafe Eixample" },
  { id: "688783ad62f73e183d44c1f9", name: "Federal Cafe Gótico" },

  { id: "688783ad62f73e183d44c1fa", name: "Santander Work Café" },
  { id: "688783ad62f73e183d44c1fb", name: "Santander Work Café Sarriá" },
  { id: "688783ad62f73e183d44c1fc", name: "Santander Work Café Diagonal" },
  { id: "688783ad62f73e183d44c1fd", name: "Syra Coffe Sarriá" },
  { id: "688783ad62f73e183d44c1fe", name: "Buenas Migas Villarroel" },
  { id: "688783ad62f73e183d44c1ff", name: "Buenas Migas Plaça España" },

  { id: "688783ad62f73e183d44c200", name: "Buena Migas Poblenou" },
  { id: "688783ad62f73e183d44c201", name: "Buenas Migas Paralelo" },
  { id: "688783ad62f73e183d44c202", name: "Buena Migas Eixample" },
  { id: "688783ad62f73e183d44c203", name: "Buenas Migas Mallorca" },
  { id: "688783ad62f73e183d44c204", name: "Buenas Migas I´lla" },
  { id: "688783ad62f73e183d44c205", name: "Santa Gloria Concili de Trento" },
  { id: "688783ad62f73e183d44c206", name: "Santa Gloria Cartagena" },
  {
    id: "688783ad62f73e183d44c207",
    name: "Santa Gloria Sant Antoni Maria Claret ",
  },
  { id: "688783ad62f73e183d44c208", name: "Sant Gloria Provenza" },
  { id: "688783ad62f73e183d44c209", name: "Vivari Coffe & Bakery" },

  { id: "688783ad62f73e183d44c20a", name: "Vivari Navas de Tolosa" },
  { id: "688783ad62f73e183d44c20b", name: "El Taller - Bar Cultural" },
  { id: "688783ad62f73e183d44c20c", name: "El Taller Cafetería" },
  { id: "688783ad62f73e183d44c20d", name: "Starbucks Aragò" },
  { id: "688783ad62f73e183d44c20e", name: "Starbucks Diagonal Les Corts" },
  { id: "688783ad62f73e183d44c20f", name: "Starbucks Plaza España" },

  { id: "688783ad62f73e183d44c210", name: "Starbucks Rambla Catalunya" },
];

async function updateCafeNames() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB.");

    for (const cafeData of cafesToUpdate) {
      const result = await Cafe.findByIdAndUpdate(
        cafeData.id,
        { $set: { name: cafeData.name } },
        { new: true } // Para obtener el documento actualizado
      );
      if (result) {
        console.log(`Actualizado: ${result.name} (ID: ${result._id})`);
      } else {
        console.warn(`No se encontró la cafetería con ID: ${cafeData.id}`);
      }
    }

    console.log("Todos los nombres actualizados.");
  } catch (error) {
    console.error("Error al actualizar los nombres de las cafeterías:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB.");
  }
}

updateCafeNames();
