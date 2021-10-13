import boostrap from 'boostrap';

const main = async () => {
  const app = boostrap();

  app.listen(3000);
  console.log('Server started at port 3000');
};

main();
