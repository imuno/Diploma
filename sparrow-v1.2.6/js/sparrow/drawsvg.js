/*-----------------------------------------------
|   Draw SVG
-----------------------------------------------*/
import spUtils from './Utils';
import spDetector from './detector';
/*
  global TimelineMax, TweenMax
*/
(($) => {
  /*-----------------------------------------------
  |   SVG animation
  -----------------------------------------------*/
  const zanimSVG = $('[data-zanim-svg]');
  if (zanimSVG.length && !spDetector.isPuppeteer) {
    zanimSVG.each((index, value) => {
      const $this = $(value);
      const path = $this.find('path');
      const controller = $this.data('zanim-svg');

      controller.delay || (controller.delay = 0);
      controller.duration || (controller.duration = 2);
      controller.ease || (controller.ease = 'Expo.easeOut');

      const tl = new TimelineMax();
      const DrawSvgInit = tl.from(path, controller.duration, {
        drawSVG: 0,
        delay: controller.delay,
        ease: controller.ease,
      }).pause();

      function svgTrigger() {
        if (spUtils.isScrolledIntoView($this) && (controller.trigger === 'scroll')) {
          DrawSvgInit.play();
          TweenMax.set(path, { visibility: 'visible' });
          controller.trigger = false;
        }
      }

      spUtils.$document.ready(() => {
        svgTrigger();
        spUtils.$window.on('scroll', () => {
          svgTrigger();
        });
      });
    });
  }
})(jQuery);
