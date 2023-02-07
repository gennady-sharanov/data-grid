export const getIDs = () => {
  const lengthResult = 30;
  const lengthId = 5;
  const ids = [];

  const makeid = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';

    for (let i = 0; i < lengthId; i += 1)
      result += characters.charAt(Math.floor(Math.random() * charactersLength));

    return result;
  };

  for (let i = 0; i < lengthResult; i += 1) {
    ids.push(
      {
        id: i,
        value: makeid()
      }
    );
  }

  return ids;
};


export default {
  state:{
    ids: getIDs(),
  }
};