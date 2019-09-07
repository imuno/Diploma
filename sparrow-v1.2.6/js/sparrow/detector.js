'use strict';

import spUtils from './Utils';

/*-----------------------------------------------
|   Variables
-----------------------------------------------*/
/*
  global opr, safari
*/

/*-----------------------------------------------
|   Detector
-----------------------------------------------*/
const spDetector = (() => {
  const Detector = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(spUtils.nua),
    isOSX: spUtils.nua.match(/(iPad|iPhone|iPod|Macintosh)/g),
    isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
    isFirefox: typeof InstallTrigger !== 'undefined',
    isSafari: /constructor/i.test(window.HTMLElement) || (p => p.toString() === '[object SafariRemoteNotification]')(!window.safari || safari.pushNotification),
    isNewerIE: spUtils.nua.match(/msie (9|([1-9][0-9]))/i),
    isOlderIE: spUtils.nua.match(/msie/i) && !this.isNewerIE,
    isAncientIE: spUtils.nua.match(/msie 6/i),
    isIE: this.isAncientIE || this.isOlderIE || this.isNewerIE,
    isIE11: !!window.MSInputMethodContext && !!document.documentMode,
    isEdge: !this.isIE11 && !this.isIE && !!window.StyleMedia,
    isChrome: !!window.chrome && !!window.chrome.webstore,
    isBlink: (this.isChrome || this.isOpera) && !!window.CSS,
    isPuppeteer: spUtils.nua.match(/puppeteer/i),
    isIOS: parseFloat(((/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(spUtils.nua) || [0, ''])[1]).replace('undefined', '3_2').replace('_', '.').replace('_', '')) || false,
    iPadiPhoneFirefox: spUtils.nua.match(/iPod|iPad|iPhone/g) && spUtils.nua.match(/Gecko/g),
    macFirefox: spUtils.nua.match(/Macintosh/g) && spUtils.nua.match(/Gecko/g) && spUtils.nua.match(/rv:/g),
    isAndroid: (spUtils.nua.indexOf('Mozilla/5.0') > -1 && spUtils.nua.indexOf('Android ') > -1 && spUtils.nua.indexOf('AppleWebKit') > -1),
  };


  spUtils.$document.ready(() => {
    if (Detector.isOpera) spUtils.$html.addClass('opera');
    if (Detector.isMobile) spUtils.$html.addClass('mobile');
    if (Detector.isOSX) spUtils.$html.addClass('osx');
    if (Detector.isFirefox) spUtils.$html.addClass('firefox');
    if (Detector.isSafari) spUtils.$html.addClass('safari');
    if (Detector.isIOS) spUtils.$html.addClass('ios');
    if (Detector.isIE || Detector.isIE11) spUtils.$html.addClass('ie');
    if (Detector.isEdge) spUtils.$html.addClass('edge');
    if (Detector.isChrome) spUtils.$html.addClass('chrome');
    if (Detector.isBlink) spUtils.$html.addClass('blink');
    if (Detector.isPuppeteer) spUtils.$html.addClass('puppeteer');
  });

  return Detector;
})();

export default spDetector;

