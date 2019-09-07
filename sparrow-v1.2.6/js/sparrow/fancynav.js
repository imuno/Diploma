'use strict';

import spUtils from './Utils';
import spDetector from './detector';

/*
  global TimelineMax
*/

/*-----------------------------------------------
|   Initializing
-----------------------------------------------*/
spUtils.$document.ready(() => {
  const ClassName = {
    SHOW: 'show',
    PLAY: 'play',
    COLLAPSED: 'collapsed',
    BG_BLACK: 'bg-black',
    FANCYNAVBAR_LEFT: 'fancynavbar-left',
  };
  const Selector = {
    FANCYNAVBAR: '.fancynavbar',
    FANCYNAVBAR_LEFT: '.fancynavbar-left',
    FANCYNAVBAR_TOGGLERBAR: '.fancynavbar-togglerbar',
    FANCYNAVBAR_BRAND_IMG: '.fancynavbar-brand-img',
    FANCYNAVBAR_ADDON: '.fancynavbar-addon',
    FANCYNAVBAR_COLLAPSE: '.fancynavbar-collapse',
    FANCYNAVBAR_TOGGLER: '.fancynavbar-toggler',
    FANCYNAVBAR_TOGGLER_ICON: '.fancynavbar-toggler-icon',
    PATH_TOP: '#path-top',
    PATH_MIDDLE: '#path-middle',
    PATH_BOTTOM: '#path-bottom',
    FANCYNAV_LINK: '.fancynav-link',
    FANCY_DROPDOWN: '.fancy-dropdown',
    FANCY_DROPDOWN_MENU: '.fancy-dropdown-menu',
    FANCY_DROPDOWN_TOGGLE: '.fancy-dropdown-toggle',
    FANCY_DROPDOWN_ITEM: '.fancy-dropdown-item',
  };
  const DATA_KEY = {
    ZANIM_MD: 'zanim-md',
    ZANIM_LG: 'zanim-lg',
    EXCLUSIVE: 'exclusive',
  };
  const EASE = 'CubicBezier';
  const $fancynavbar = $(Selector.FANCYNAVBAR);
  const isFancynavbarLeft = $fancynavbar.hasClass(ClassName.FANCYNAVBAR_LEFT);

  /*-----------------------------------------------
  |   RTL compatibility
  -----------------------------------------------*/
  if ((spUtils.isRTL() || isFancynavbarLeft) && !(spUtils.isRTL() && isFancynavbarLeft)) {
    console.log('In the box');
    const $fancyNavbarBrandImg = $(Selector.FANCYNAVBAR_BRAND_IMG);
    const $fancyNavbarTogglerIcon = $(Selector.FANCYNAVBAR_TOGGLER_ICON);
    const $fancyNavbarAddon = $(Selector.FANCYNAVBAR_ADDON);

    $fancynavbar
      .data(DATA_KEY.ZANIM_LG).from.x = -$fancynavbar.data(DATA_KEY.ZANIM_LG).from.x;
    $fancyNavbarBrandImg
      .data(DATA_KEY.ZANIM_LG).from.x = -$fancyNavbarBrandImg.data(DATA_KEY.ZANIM_LG).from.x;
    $fancyNavbarTogglerIcon
      .data(DATA_KEY.ZANIM_LG).from.x = -$fancyNavbarTogglerIcon.data(DATA_KEY.ZANIM_LG).from.x;
    $fancyNavbarAddon
      .data(DATA_KEY.ZANIM_LG).from.x = -$fancyNavbarAddon.data(DATA_KEY.ZANIM_LG).from.x;
  }

  if ($fancynavbar.length) {
    const $fancyNavbarCollapse = $(Selector.FANCYNAVBAR_COLLAPSE);
    const $fancyNavbarToggler = $(Selector.FANCYNAVBAR_TOGGLER);
    const exclusive = $fancynavbar.data(DATA_KEY.EXCLUSIVE);
    let x = '100%';

    ((spUtils.isRTL() || isFancynavbarLeft) && !(spUtils.isRTL() && isFancynavbarLeft)) && (x = '-100%');

    /*-----------------------------------------------
    |   Fancy Navbar Collapse Animation
    -----------------------------------------------*/
    const fancyNavbarCollapseTimeline = new TimelineMax().pause();
    const $fancyNavItems = $(`${Selector.FANCYNAV_LINK}, ${Selector.FANCY_DROPDOWN_MENU}`);
    $fancyNavItems.css('opacity', 0);

    fancyNavbarCollapseTimeline
      .fromTo($fancyNavbarCollapse, 0.6, { x }, { x: '0%', ease: EASE })
      .staggerFromTo($fancyNavItems.toArray(), 0.8, { y: 56, opacity: 0 }, { y: 0, opacity: 1, ease: EASE }, 0.05, '-=0.4');
    /*-----------------------------------------------
    |   End of Drawer Animation
    -----------------------------------------------*/

    /*-----------------------------------------------
    |   Fancy Navbar Toggler Icon Animation
    -----------------------------------------------*/
    const fancyNavbarTogglerIconTimeline = new TimelineMax().pause();
    const $fancyNavbarTogglerIcon = $(Selector.FANCYNAVBAR_TOGGLER_ICON);
    const $fancyNavbarTogglerIconPathTop = $fancyNavbarTogglerIcon.children(Selector.PATH_TOP);
    const $fancyNavbarTogglerIconPathMiddle = $fancyNavbarTogglerIcon
      .children(Selector.PATH_MIDDLE);
    const $fancyNavbarTogglerIconPathBottom = $fancyNavbarTogglerIcon
      .children(Selector.PATH_BOTTOM);

    fancyNavbarTogglerIconTimeline.fromTo($fancyNavbarTogglerIconPathTop, 0.5, {
      'stroke-dashoffset': '0', 'stroke-dasharray': '30px 88px',
    }, {
      'stroke-dashoffset': '-81px', delay: 0, ease: EASE,
    }, 0).fromTo($fancyNavbarTogglerIconPathMiddle, 0.5, {
      'stroke-dashoffset': '0', 'stroke-dasharray': '30px 30px',
    }, {
      'stroke-dashoffset': '-15px', 'stroke-dasharray': '0.1px 30px', delay: 0, ease: EASE,
    }, 0).fromTo($fancyNavbarTogglerIconPathBottom, 0.5, {
      'stroke-dashoffset': '-87.9px', 'stroke-dasharray': '30px 88.1px',
    }, {
      'stroke-dashoffset': '-6.3px', delay: 0, ease: EASE,
    }, 0);
    /*-----------------------------------------------
    |   End of Fancy Navbar Toggler Icon Animation
    -----------------------------------------------*/

    const animateMenu = () => {
      $fancyNavbarTogglerIcon.hasClass(ClassName.PLAY)
        ? fancyNavbarTogglerIconTimeline.reverse()
        : fancyNavbarTogglerIconTimeline.play();
      $fancyNavbarTogglerIcon.toggleClass(ClassName.PLAY);

      $fancyNavbarToggler.hasClass(ClassName.COLLAPSED)
        ? fancyNavbarCollapseTimeline.reverse()
        : fancyNavbarCollapseTimeline.play();
      $fancyNavbarToggler.toggleClass(ClassName.COLLAPSED);
    };

    $fancyNavbarToggler.on('click', animateMenu);
    spUtils.$main.on('click', () => {
      $fancyNavbarToggler.hasClass(ClassName.COLLAPSED) && animateMenu();
    });

    /*-----------------------------------------------
    |   Resize Fancy Dropdown
    -----------------------------------------------*/
    const $fancyDropdownMenus = $(Selector.FANCY_DROPDOWN_MENU);
    if ($fancyDropdownMenus.length) {
      $fancyDropdownMenus.each((index, value) => {
        const $fancyDropdownMenu = $(value);
        $fancyDropdownMenu
          .parent(Selector.FANCY_DROPDOWN)
          .height($fancyDropdownMenu
            .siblings(Selector.FANCY_DROPDOWN_TOGGLE)
            .height());
      });

      /*-----------------------------------------------
      |   On Resize, Adjust the Menu Height
      -----------------------------------------------*/
      spUtils.$window.resize(() => {
        const $fancyDropdownToggles = $(Selector.FANCY_DROPDOWN_TOGGLE);
        $fancyDropdownToggles.each((index, value) => {
          const $fancyDropdownToggle = $(value);
          if ($fancyDropdownToggle.hasClass(ClassName.SHOW)) {
            $fancyDropdownToggle
              .parent(Selector.FANCY_DROPDOWN)
              .height($fancyDropdownToggle.height()
                + $fancyDropdownToggle
                  .siblings(Selector.FANCY_DROPDOWN_MENU).height());
          } else {
            $fancyDropdownToggle
              .parent(Selector.FANCY_DROPDOWN)
              .height($fancyDropdownToggle.height());
          }
        });
      });
    }
    /*-----------------------------------------------
    |   End of Resize Fancy Dropdown
    -----------------------------------------------*/
    const clickEvent = spDetector.isIOS ? 'click tap' : 'click';
    $(Selector.FANCYNAV_LINK).on(clickEvent, (e) => {
      // Fancyscroll in Fancynav
      const $this = $(e.target);
      function getAttributes($node) {
        const attrs = [];
        const attrsObj = {};
        $.each($node[0].attributes, (index, attribute) => attrs.push(attribute.name));
        $.each($node[0].attributes, (i, a) => {
          attrsObj[a.name] = a.value;
        });
        return { attrs, attrsObj };
      }

      const fancyscroll = (target, elem) => {
        $('html, body').animate({
          scrollTop: (target.offset().top - (elem.data('offset') || 0)),
        }, 400, 'swing', () => {
          const hash = elem.attr('href');
          window.history.pushState ?
            window.history.pushState(null, null, hash) : window.location.hash = hash;
        });
        animateMenu();
      };

      if ($this.hasClass('fancynav-link') && getAttributes($this).attrs.includes('data-fancyscroll')) {
        fancyscroll($(`#${getAttributes($this).attrsObj.href.split('#')[1]}`), $this);
        return;
      } else if ($this.parent().hasClass('fancynav-link') && getAttributes($this.parent()).attrs.includes('data-fancyscroll')) {
        fancyscroll($(`#${getAttributes($this.parent()).attrsObj.href.split('#')[1]}`), $this.parent());
        return;
      }

      // Keeping the menu open on ctrl/cmd + click
      if (e.ctrlKey || e.metaKey) return;

      const $fancyLink = $(e.currentTarget);
      const fancyDropdownMenuTimeline = new TimelineMax().pause();

      const listOfitems = $fancyLink
        .siblings(Selector.FANCY_DROPDOWN_MENU)
        .find(Selector.FANCY_DROPDOWN_ITEM)
        .toArray();

      fancyDropdownMenuTimeline
        .staggerFromTo(
          listOfitems, 0.3,
          { y: 30, opacity: 0 }, { y: 0, opacity: 1, ease: EASE }, 0.01,
        ).delay(0.1);

      if ($fancyLink.hasClass(ClassName.SHOW)) {
        fancyDropdownMenuTimeline.reverse();
        $fancyLink
          .parent(Selector.FANCY_DROPDOWN)
          .height($fancyLink.height());
      } else {
        $fancyLink
          .parent(Selector.FANCY_DROPDOWN)
          .height($fancyLink.height()
          + $fancyLink
            .siblings(Selector.FANCY_DROPDOWN_MENU)
            .height());
        fancyDropdownMenuTimeline.play();
      }
      /*-----------------------------------------------
       |   Exclusive
       -----------------------------------------------*/
      if (exclusive) {
        $fancyLink.closest(Selector.FANCY_DROPDOWN)
          .siblings(Selector.FANCY_DROPDOWN)
          .height($fancyLink.height())
          .children(Selector.FANCY_DROPDOWN_TOGGLE)
          .removeClass(ClassName.SHOW);
      }
      $fancyLink
        .closest(Selector.FANCY_DROPDOWN)
        .toggleClass(ClassName.SHOW);
      $fancyLink.toggleClass(ClassName.SHOW);
    });


    /*-----------------------------------------------
    |   Transparency on scroll on mobile
    -----------------------------------------------*/
    const $togglerbar = $(Selector.FANCYNAVBAR_TOGGLERBAR);
    const onscrollFadeIn = $togglerbar.data('onscroll-fade-in');
    const prevBgColor = $togglerbar.css('backgroundColor');
    const prevBgClass = $(Selector.FANCYNAVBAR_TOGGLERBAR).attr('class').split(' ').filter(className => className.indexOf('bg-') === 0)[0];
    if (onscrollFadeIn) {
      let sideNavBackgroundColor = $togglerbar.css('backgroundColor');
      if (sideNavBackgroundColor === 'transparent') sideNavBackgroundColor = 'rgb(0, 0, 0)';
      if (sideNavBackgroundColor.indexOf('a') === -1) {
        sideNavBackgroundColor = sideNavBackgroundColor.replace(')', ', 1)').replace('rgb', 'rgba');
      }
      let backgroundColorAlpha = sideNavBackgroundColor.split(', ')[3].split(')')[0];
      if (spUtils.$window.scrollTop() === 0) backgroundColorAlpha = 0;

      let timer; // Fix for IE resize event handler
      const changeFancyNavBG = () => {
        if (timer) window.clearTimeout(timer);
        timer = window.setTimeout(function() {
          const windowHeight = spUtils.$window.height();
          if (spUtils.$window.width() >= spUtils.breakpoints.lg) {
            $togglerbar.addClass(prevBgClass);
            $togglerbar.css({ backgroundColor: prevBgColor });
          } else {
            $togglerbar.removeClass(prevBgClass);
            const tempBgColor = sideNavBackgroundColor.split(', ');
            tempBgColor[3] = `${backgroundColorAlpha})`;
            let bgColor = tempBgColor.join();
            $togglerbar.css({ 'background-color': bgColor });
            spUtils.$window.scroll(() => {
              if (spUtils.$window.width() < spUtils.breakpoints.lg) {
                const scrollTop = spUtils.$window.scrollTop();
                backgroundColorAlpha = (scrollTop / windowHeight) * 2;
                (backgroundColorAlpha >= 1) && (backgroundColorAlpha = 1);
                tempBgColor[3] = `${backgroundColorAlpha})`;
                bgColor = tempBgColor.join();
                $togglerbar.css({ 'background-color': bgColor });
              }
            });
          }
        }, 100);
      };
      changeFancyNavBG();
      spUtils.$window.on('resize', changeFancyNavBG);
    }
  }
});

