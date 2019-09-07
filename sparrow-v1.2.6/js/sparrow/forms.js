'use strict';

import spUtils from './Utils';

/*-----------------------------------------------
|   Forms
-----------------------------------------------*/
/*-----------------------------------------------
|   Choose a file
-----------------------------------------------*/
const inputs = document.querySelectorAll('.zinput-file');
(() => {
  Array.prototype.forEach.call(inputs, (input) => {
    const label = input.nextElementSibling;
    const labelVal = label.innerHTML;

    input.addEventListener('change', (e) => {
      let fileName = '';
      if (this.files && this.files.length > 1) {
        fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
      } else {
        fileName = e.target.value.split('\\').pop();
      }

      if (fileName) {
        label.querySelector('span').innerHTML = fileName;
      } else {
        label.innerHTML = labelVal;
      }
    });

    // Firefox bug fix
    input.addEventListener('focus', () => input.classList.add('has-focus'));
    input.addEventListener('blur', () => input.classList.remove('has-focus'));
  });
})(document, window, 0);

spUtils.$document.ready(() => {
  if (inputs.length) {
    $('.zinput-file + label').prepend('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewbox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>');
  }
});


/*-----------------------------------------------
|   Checkbox and Radio
-----------------------------------------------*/
if (document.createElement('svg').getAttributeNS) {
  const checkbxsCheckmark = Array.prototype.slice.call(document.querySelectorAll('.zinput.zcheckbox input[type="checkbox"]'));
  const pathDefs = {
    checkmark: ['M16.7,62.2c4.3,5.7,21.8,27.9,21.8,27.9L87,16'],
  };
  const animDefs = {
    checkmark: { speed: 0.2, easing: 'ease-in-out' },
  };

  const createSVGEl = (def) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    if (def) {
      svg.setAttributeNS(null, 'viewBox', def.viewBox);
      svg.setAttributeNS(null, 'preserveAspectRatio', def.preserveAspectRatio);
    } else {
      svg.setAttributeNS(null, 'viewBox', '0 0 100 100');
    }
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    return svg;
  };

  const draw = (el) => {
    const paths = [];
    const svg = el.parentNode.querySelector('svg');

    const pathDef = pathDefs.checkmark;
    const animDef = animDefs.checkmark;


    paths.push(document.createElementNS('http://www.w3.org/2000/svg', 'path'));

    for (let i = 0, len = paths.length; i < len; i += 1) {
      const path = paths[i];
      svg.appendChild(path);

      path.setAttributeNS(null, 'd', pathDef[i]);

      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length} ${length}`;
      if (i === 0) {
        path.style.strokeDashoffset = Math.floor(length) - 1;
      } else {
        path.style.strokeDashoffset = length;
      }
      path.getBoundingClientRect();
      path.style.transition = path.style.WebkitTransition;
      path.style.transition = path.style.MozTransition;
      path.style.transition = `stroke-dashoffset ${animDef.speed}s ${animDef.easing} ${i * animDef.speed}s`;
      path.style.strokeDashoffset = '0';
    }
  };

  const reset = (el) => {
    Array.prototype.slice.call(el.parentNode.querySelectorAll('svg > path')).forEach((elem) => {
      elem.parentNode.removeChild(elem);
    });
  };

  const controlCheckbox = (el, type, svgDef) => {
    const svg = createSVGEl(svgDef);
    el.parentNode.appendChild(svg);
    if (el.checked) {
      draw(el, type);
    }

    el.addEventListener('change', () => {
      if (el.checked) {
        draw(el, type);
      } else {
        reset(el);
      }
    });
  };
  checkbxsCheckmark.forEach(el => controlCheckbox(el, 'checkmark'));
}

/*-----------------------------------------------
|   Bootstrap validation
-----------------------------------------------*/
(() => {
  window.addEventListener('load', () => {
    // Fetch all the forms we want to apply sparrow Bootstrap validation styles to
    const forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, (form) => {
      form.addEventListener('submit', (event) => {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
