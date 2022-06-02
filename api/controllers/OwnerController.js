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

export { createOwner };
