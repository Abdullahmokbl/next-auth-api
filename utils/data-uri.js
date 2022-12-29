const path = require('path');
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();

export const formatBufferTo64 = file =>
  parser.format(path.extname(file.originalname).toString(), file.buffer)

// export default formatBufferTo64;