import Pet from '../models/Pet.js';
import Owner from '../models/Owner.js';

const createPet = async (req, res) => {
  const { pet, ownerId } = req.body;

  if (!pet || !ownerId) {
    return res.status(400).json({
      msg: 'Falta información en el body, pet or ownerId found',
    });
  }
  try {
    const owner = await Owner.findById(ownerId);

    if (!owner) {
      return res.status(404).json({
        msg: 'Dueñ@ no encontrado',
      });
    }

    const newPet = await Pet.create(pet);

    owner.mascotas.push(newPet.id);

    await owner.save();

    return res.json({
      msg: `Mascota creada satisfactoriamente para el usuario ${owner.nombre}`,
      pet: newPet,
    });
  } catch (error) {
    const result = {
      msg: 'Ha ocurrido un error al guardar la mascota',
      error:
        process.env.NODE_ENV == 'local' || process.env.NODE_ENV == 'development'
          ? error
          : null,
    };
    return res.status(500).json(result);
  }
};

export { createPet };
