'use strict';

import spUtils from './Utils';
import spDetector from './detector';

/*-----------------------------------------------
|   Global Functions
-----------------------------------------------*/

/*
global TimelineMax, TweenMax, CustomEase
*/

CustomEase.create('CubicBezier', '.77,0,.18,1');

const filterBlur = () => {
  let blur = 'blur(5px)';
  if (spDetector.iPadiPhoneFirefox || spDetector.macFirefox) {
    blur = 'blur(0px)';
  }
  return blur;
};

const zanimationEffects = {
  default: {
    from: {
      opacity: 0,
      y: 70,
    },
    to: {
      opacity: 1,
      y: 0,
    },
    ease: 'CubicBezier',
    duration: 0.8,
    delay: 0,
  },

  'slide-down': {
    from: {
      opacity: 0,
      y: -70,
    },
    to: {
      opacity: 1,
      y: 0,
    },
    ease: 'CubicBezier',
    duration: 0.8,
    delay: 0,
  },

  'slide-left': {
    from: {
      opacity: 0,
      x: 70,
    },
    to: {
      opacity: 1,
      x: 0,
    },
    ease: 'CubicBezier',
    duration: 0.8,
    delay: 0,
  },

  'slide-right': {
    from: {
      opacity: 0,
      x: -70,
    },
    to: {
      opacity: 1,
      x: 0,
    },
    ease: 'CubicBezier',
    duration: 0.8,
    delay: 0,
  },

  'zoom-in': {
    from: {
      scale: 0.9,
      opacity: 0,
      filter: filterBlur(),
    },
    to: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
    },
    delay: 0,
    ease: 'CubicBezier',
    duration: 0.8,
  },

  'zoom-out': {
    from: {
      scale: 1.1,
      opacity: 1,
      filter: filterBlur(),
    },
    to: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
    },
    delay: 0,
    ease: 'CubicBezier',
    duration: 0.8,
  },

  'zoom-out-slide-right': {
    from: {
      scale: 1.1,
      opacity: 1,
      x: -70,
      filter: filterBlur(),
    },
    to: {
      scale: 1,
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
    },
    delay: 0,
    ease: 'CubicBezier',
    duration: 0.8,
  },

  'zoom-out-slide-left': {
    from: {
      scale: 1.1,
      opacity: 1,
      x: 70,
      filter: filterBlur(),
    },
    to: {
      scale: 1,
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
    },
    delay: 0,
    ease: 'CubicBezier',
    duration: 0.8,
  },

  'blur-in': {
    from: {
      opacity: 0,
      filter: filterBlur(),
    },
    to: {
      opacity: 1,
      filter: 'blur(0px)',
    },
    delay: 0,
    ease: 'CubicBezier',
    duration: 0.8,
  },
};

if (spUtils.isRTL()) {
  Object.keys(zanimationEffects).forEach((key) => {
    if (zanimationEffects[key].from.x) {
      zanimationEffects[key].from.x = -zanimationEffects[key].from.x;
    }
  });
}

const breakPointConst = spUtils.getCurrentScreanBreakpoint();


/*-----------------------------------------------
|   Zanimation
-----------------------------------------------*/
(function zanimation($) {


  /*-----------------------------------------------
  |   Get Controller
  -----------------------------------------------*/
  let controllerZanim;
  const getController = (el) => {
    const $this = $(el);
    let options = {};
    let controller = {};

    $.each($this, (index, value) => {
      if (value.hasAttribute(`data-zanim-${breakPointConst.currentScrean}`)) {
        controllerZanim = `zanim-${breakPointConst.currentScrean}`;
      } else {
        /*-----------------------------------------------
        |   Set the mobile first Animation
        -----------------------------------------------*/
        let animationBreakpoints = [];
        $.each(value.attributes, (i, attribute) => {
          if (attribute.name !== 'data-zanim-trigger' && ((spDetector.isIE || spDetector.isIE11 || spDetector.isEdge) ? attribute.name.match('^data-zanim-') : attribute.name.startsWith('data-zanim-'))) {
            const breakPoint = spUtils.breakpoints[attribute.name.split('data-zanim-')[1]];
            if (breakPoint < breakPointConst.currentBreakpoint) {
              animationBreakpoints.push({
                name: attribute.name.split('data-zanim-')[1],
                size: breakPoint,
              });
            }
          }
          return i;
        });

        controllerZanim = undefined;
        if (animationBreakpoints.length !== 0) {
          animationBreakpoints = animationBreakpoints.sort((a, b) => a.size - b.size);
          const activeBreakpoint = animationBreakpoints.pop();
          controllerZanim = `zanim-${activeBreakpoint.name}`;
        }
      }
      return index;
    });

    controller = $.extend(true, {}, options, $this.data(controllerZanim));

    if (!(controllerZanim === undefined)) {
      if ($this.data(controllerZanim).animation) {
        options = zanimationEffects[$this.data(controllerZanim).animation];
      } else {
        options = zanimationEffects.default;
      }
    }
    if (controllerZanim === undefined) {
      options = {
        delay: 0,
        duration: 0,
        ease: 'Expo.easeOut',
        from: {},
        to: {},
      };
    }

    /*-----------------------------------------------
    |   populating the controller
    -----------------------------------------------*/
    controller.delay || (controller.delay = options.delay);
    controller.duration || (controller.duration = options.duration);
    controller.from || (controller.from = options.from);
    controller.to || (controller.to = options.to);

    (controller.ease && (controller.to.ease = controller.ease) && controller.to.ease)
    || (controller.to.ease = options.ease);

    return controller;
  };
  /*-----------------------------------------------
  |   End of Get Controller
  -----------------------------------------------*/

  jQuery.fn.zanimation = function zanim(callback) {
    const $this = $(this);

    /*-----------------------------------------------
    |   For Timeline
    -----------------------------------------------*/
    const zanimTimeline = $this.data('zanim-timeline');
    if (zanimTimeline) {
      const timeline = new TimelineMax(zanimTimeline);
      const timelineElements = $this.find('[data-zanim-xs], [data-zanim-sm], [data-zanim-md], [data-zanim-lg], [data-zanim-xl]');

      timelineElements.map((index, value) => {
        const controller = getController(value);
        timeline
          .fromTo($(value), controller.duration, controller.from, controller.to, controller.delay)
          .pause();

        return index;
      });

      $this.imagesLoaded(() => callback(timeline));
    } else if (!$this.parents('[data-zanim-timeline]').length) {
      /*-----------------------------------------------
      |   For single elements outside timeline
      -----------------------------------------------*/
      const controller = getController($this);
      callback(TweenMax
        .fromTo($this, controller.duration, controller.from, controller.to)
        .delay(controller.delay)
        .pause());
    }

    callback(new TimelineMax());

  };

}(jQuery));


/*-----------------------------------------------
|   Triggering zanimation when the element enters in the view
-----------------------------------------------*/
(function triggeringZanimation($) {
  const triggerZanimation = ($this) => {
    if (spUtils.isScrolledIntoView($this) && $this.attr('data-zanim-trigger') === 'scroll') {
      $this.zanimation(animation => animation.play());
      if (!$this.data('zanim-repeat')) $this.removeAttr('data-zanim-trigger');
    }
  };

  spUtils.$document.ready(() => {
    /*-----------------------------------------------
    |   Playing zanimation for scroll triggers
    -----------------------------------------------*/
    $("*[data-zanim-trigger = 'scroll']").map((index, value) => {
      triggerZanimation($(value));
      spUtils.$window.on('scroll', () => {
        triggerZanimation($(value));
      });
      return index;
    });
  });

}(jQuery));
