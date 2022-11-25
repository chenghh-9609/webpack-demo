import * as _ from 'lodash';
import MyImage from './background.jpg';
function component() {
  const element = document.createElement('div');
  element.innerHTML = _.join(['hello', 'webpack'], ' ');
  return element;
}

document.body.appendChild(component());
