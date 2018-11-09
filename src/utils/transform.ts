import nanoid from 'nanoid';

export const transformList = (data): any => {
  const { records } = data;

  return {
    records:
      records && records.length
        ? records.map(rec => Object.assign({ id: nanoid() }, rec))
        : [],
    total: data.total,
    pages: data.pages,
    current: data.current,
    size: data.size,
  };
};
