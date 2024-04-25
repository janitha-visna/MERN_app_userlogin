
let p = new Promise((resolve,reject) => {
    let a = 1+1
    if(a == 2){
        resolve ('sucess')
    }else{
        reject('failed')
    }
})

p.then((message) => {
console.log('this is the the ' + message)
}).catch((message) => {
     console.log('this is the cathc' + message)
})


let c = new Promise((resolve, reject) => {
  let c = 1 + 2;
  if (c == 2) {
    resolve("sucess");
  } else {
    reject("failed");
  }
});