import Owner from '../models/Owner.js';

const createOwner = async (req, res) => {
  const { owner } = req.body;

  if (!owner) {
    return res.status(400).json({
      msg: 'Falta información en el body, owner not found',
    });
  }
  try {
    const newOwner = await Owner.create(owner);
    return res.json({
      msg: 'Dueñ@ cread@ satisfactoriamente',
      owner: newOwner,
    });
  } catch (error) {
    const result = {
      msg: 'Ha ocurrido un error al guardar al dueñ@',
      error:
        process.env.NODE_ENV == 'local' || process.env.NODE_ENV == 'development'
          ? error
          : null,
    };
    return res.status(500).json(result);
  }
};

const getOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    return res.json({
      msg: 'Usuarios encontrados',
      data: owners,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Ha ocurrido un error al consultar los dueños',
    });
  }
};

const getOwnerByIdWithPets = async (req, res) => {
  const { id } = req.params;

  try {
    const owner = await Owner.findById(id).populate('mascotas');

    if (!owner) {
      return res.status(404).json({
        msg: `Dueñ@ no encontrado con id ${id}`,
      });
    }

    return res.json({
      msg: 'Dueñ@ encontrado',
      data: owner,
    });
  } catch (error) {}
};

export { createOwner, getOwners, getOwnerByIdWithPets };
