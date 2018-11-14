
const arr2csv = (array, cols, cb) => {
  
  let cols = ['name','lat','lng','street','city','state','zip','cost','phone','website'];
  let data = '';

  const compileRow = (elem) => {
    for (let i = 0; i < cols.length; i++) {
      data += elem[cols[i]] + ',';
    }
    data = data.slice(0, data.length - 1);
    data += '\r\n';
  };
  
  for (let i = 0; i < cols.length; i++) {
    data += cols[i] + ',';
  }
  data = data.slice(0, data.length - 1);
  data += '\r\n';

  for (let i = 0; i < array.length; i++) {
    compileRow(array[i]);
  }

  cb(null, data);
};

module.exports = arr2csv;