const fs = require('fs');

const santaHelper = () => {
  console.time('TIME')
  fs.readFile('./santa.txt', (err, data) => {
    //Convert to string
    const directions = data.toString();
    //Array
    const directionArray = directions.trim().split('');

    //Loop
    const answer = directionArray.reduce((accumulator, currentValue) => {
      (currentValue === '(') ?
      accumulator += 1 :
      accumulator -= 1
      return accumulator;
    }, 0)
    console.timeEnd('TIME')
    //log result
    console.log('floor:', answer);
  })
}

santaHelper();

// fs.readFile('./hello.txt', (err, data) => {
//   err ? console.log('errroorrrr!') : console.log(data.toString())
// })
//
// const file = fs.readFileSync('./holla.txt');
// console.log(file.toString());
//
// // fs.appendFile('./holla.txt', 'Por favor yo necesito dinero!', err => {
// //   (err) ? console.log(err)
// // )
// //
// //WRITE
// fs.writeFile('bye.txt', 'So sad to see you go', err => {
//   if (err) {
//     console.log(err);
//   }
// })
//
// //DELETE
// fs.unlink('./bye.txt', err => {
//   if (err) {
//     console.log(err)
//   }
//   console.log('Inception')
// })
