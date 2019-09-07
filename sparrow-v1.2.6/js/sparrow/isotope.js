'use strict';

import spUtils from './Utils';

/*-----------------------------------------------
|   Masonry with isotope
-----------------------------------------------*/

spUtils.$window.on('load', () => {
  const $sortables = $('.sortable');

  if ($sortables.length) {
    const Selector = {
      SORTABLE_ITEM: '.sortable-item',
      SORTABLE_CONTAINER: '.sortable-container',
      MENU: '.menu',
      ITEM: '.item',
    };
    const ClassName = {
      ACTIVE: 'active',
    };
    const DATA_KEY = {
      OPTIONS: 'options',
      FILTER_GROUP: 'filter-group',
      FILTER: 'filter',
    };

    $sortables.each((index, value) => {
      const $sortable = $(value);
      const $masonryContainer = $sortable.find(Selector.SORTABLE_CONTAINER);
      const $menu = $sortable.find(Selector.MENU);

      $masonryContainer.isotope($.extend(
        $sortable.data(DATA_KEY.OPTIONS) || {},
        {
          itemSelector: Selector.SORTABLE_ITEM,
          masonry: {
            columnWidth: Selector.SORTABLE_ITEM,
          },
        },
      ));

      /*-----------------------------------------------
      |   Flatten object by concatting values
      -----------------------------------------------*/
      const concatValues = obj => Object.keys(obj).map(key => obj[key]).join();


      /*-----------------------------------------------
      |   Store filter for each group
      -----------------------------------------------*/
      const filters = {};

      $menu.on('click', Selector.ITEM, (e) => {
        const $masonryFilter = $(e.target);

        filters[($masonryFilter
          .parent()
          .data(DATA_KEY.FILTER_GROUP) || 0)] = $masonryFilter.data(DATA_KEY.FILTER);
        const filterValue = concatValues(filters);

        $masonryFilter
          .siblings()
          .removeClass(ClassName.ACTIVE);
        $masonryFilter
          .addClass(ClassName.ACTIVE);
        $masonryContainer
          .isotope({ filter: filterValue });
      });
    });
  }
});
