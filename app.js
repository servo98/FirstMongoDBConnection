import mongoose from 'mongoose';

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test2');
}

main()
  .then((data) => {
    console.log('Base de datos conectada', data);
  })
  .catch((err) => console.log(err));
