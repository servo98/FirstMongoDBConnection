import Pet from '../models/Pet.js';

const createPet = async (req, res) => {
  const { pet } = req.body;

  if (!pet) {
    return res.status(400).json({
      msg: 'Falta información en el body, pet not found',
    });
  }
  try {
    const newPet = await Pet.create(pet);
    return res.json({
      msg: 'Mascota creada satisfactoriamente',
      pet: newPet,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Ha ocurrido un error al guardar la mascota',
    });
  }
};

export { createPet };
