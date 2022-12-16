import './style.css';
import './style2.css';
import printMe from './print.js';
import _ from 'lodash';
import MyImage from './background.jpg';
import { cube } from './math.js';
function component() {
  console.log(cube(5));
  const element = document.createElement('div');
  element.classList.add('hello');
  element.innerHTML = join(['hello', 'webpack'], ' ');
  const image = new Image();
  image.src = MyImage;
  element.appendChild(image);
  const btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  // printMe();
  // 懒加载
  // btn.onclick = () =>
  //   import(/* webpackChunkName: "print" */ './print.js').then((module) => {
  //     print = module.default;
  //     print();
  //   });

  element.appendChild(btn);
  return element;

  // 动态导入
  // return import('lodash').then(({ default: _ }) => {
  //   const element = document.createElement('div');
  //   element.innerHTML = _.join(['hello', 'webpack'], ' ');
  //   return element;
  // });
}

document.body.appendChild(component());
// component().then((comp)=>document.body.appendChild(comp));

// if(module.hot) {
//   module.hot.accept('./print.js', ()=>{
//     console.log('Accepting the updated printMe module');
//     printMe();
//   })
// }
