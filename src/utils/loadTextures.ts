import * as THREE from 'three';

export const loadTextures = (files:any) => {
  const promiseArray:any = [];
  const loader = new THREE.TextureLoader();

  files.forEach((file:any)=> {

    const imgPromise = new Promise((resolve,reject) => {
      loader.load(
        file.img, (texture) => {
          resolve( texture )
        }
      )
    })

    promiseArray.push(imgPromise);
  })

  return promiseArray;
}

export default loadTextures;