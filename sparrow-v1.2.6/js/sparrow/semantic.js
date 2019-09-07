'use strict';

import spUtils from './Utils';

/*-----------------------------------------------
|   Sementic UI
-----------------------------------------------*/
spUtils.$document.ready(() => {
  const uiDropdown = $('.ui.dropdown');
  const uiAccordion = $('.ui.accordion');
  /*-----------------------------------------------
  |   Dropdown
  -----------------------------------------------*/
  if (uiDropdown.length) {
    uiDropdown.dropdown();
  }

  /*-----------------------------------------------
  |   Accordion
  -----------------------------------------------*/
  if (uiAccordion.length) {
    uiAccordion.each((index, value) => {
      const $this = $(value);
      $this.accordion($.extend(
        { exclusive: false },
        $this.data('options') || {},
      ));
    });
  }
});
