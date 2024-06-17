var fs = require('fs');

fs.appendFile('mynewfile2.txt', 'availble content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});

fs.open('mynewfile2.txt', 'w', function (err, file) {
  if (err) throw err;
  console.log('Saved!'+file);
});
fs.writeFile('mynewfile3.txt', 'Hello cod', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  fs.unlink('mynewfile1.txt', function (err) {
    if (err) throw err;
    console.log('File deleted!');
  })

  fs.rename('mynewfile2.txt', 'myrenamedfile.txt', function (err) {
    if (err) throw err;
    console.log('File Renamed!');
  });