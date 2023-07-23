const bcrypt = require('bcryptjs');
const asycFunc = async () => {
  const encrypted1 = await bcrypt.hash('test1234!!', 12);
  const encrypted2 = await bcrypt.hash('test1234!!', 12);
  console.log(encrypted1, encrypted2);
};

asycFunc();
