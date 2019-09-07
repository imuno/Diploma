"use strict";
var KTLayout = function() {
    var body;

    var aside;
    var asideMenu;
    var asideMenuOffcanvas;

    var scrollTop;

    var pageStickyPortlet;

    // Aside
    var initAside = function() {
        aside = KTUtil.get('kt_aside');
        
        // Init offcanvas layout for mobile
        asideMenuOffcanvas = new KTOffcanvas('kt_aside', {
            baseClass: 'kt-aside',
            overlay: true,
            closeBy: 'kt_aside_close_btn',
            toggleBy: {
                target: 'kt_aside_mobile_toggler',
                state: 'kt-header-mobile__toolbar-toggler--active'
            }
        });

        // Init aside menu
        var menu = KTUtil.get('kt_aside_menu');
        var menu = KTUtil.getByID('kt_aside_menu');
        var menuDesktopMode = (KTUtil.attr(menu, 'data-ktmenu-dropdown') === '1' ? 'dropdown' : 'accordion');

        // Init scrollable menu container
        var scroll;
        if (KTUtil.attr(menu, 'data-ktmenu-scroll') === '1') {
            scroll = {
                rememberPosition: true, // remember position on page reload
                height: function() {  // calculate available scrollable area height
                    // calculated height
                    var height;

                    // window height
                    var windowHeight = parseInt(KTUtil.getViewPort().height);
                    
                    // secondary
                    var secondary = KTUtil.find(aside, '.kt-aside__secondary');
                    var secondaryPaddingTop = parseInt(KTUtil.css(secondary, 'padding-top'));
                    var secondaryPaddingBottom = parseInt(KTUtil.css(secondary, 'padding-bottom'));

                    // top height
                    var top = KTUtil.find(aside, '.kt-aside__secondary-top');
                    var topHeight = parseInt(KTUtil.height(top));

                    // bottom
                    var bottom = KTUtil.find(aside, '.kt-aside__secondary-bottom');
                    var bottomPaddingTop = parseInt(KTUtil.css(bottom, 'padding-top'));
                    var bottomPaddingBotton = parseInt(KTUtil.css(bottom, 'padding-bottom'));

                    // calculate height
                    height = windowHeight - topHeight - bottomPaddingTop - bottomPaddingBotton - secondaryPaddingTop - secondaryPaddingBottom;
                    
                    return height;
                }
            };
        }

        // Init aside menu
        asideMenu = new KTMenu('kt_aside_menu', {
            // vertical scroll
            scroll: scroll,

            // submenu setup
            submenu: {
                desktop: {
                    // by default the menu mode set to accordion in desktop mode
                    default: menuDesktopMode,
                    // whenever body has this class switch the menu mode to dropdown
                    state: {
                        body: 'kt-aside--minimize',
                        mode: 'dropdown'
                    }
                },
                tablet: 'accordion', // menu set to accordion in tablet mode
                mobile: 'accordion' // menu set to accordion in mobile mode
            },

            //accordion setup
            accordion: {
                expandAll: false // allow having multiple expanded accordions in the menu
            }
        });
    }

    // Scrolltop
    var initScrolltop = function() {
        var scrolltop = new KTScrolltop('kt_scrolltop', {
            offset: 300,
            speed: 600
        });
    }

    // Init page sticky portlet
    var initPageStickyPortlet = function() {
        var asidePrimaryWidth = 70;
        var asideSecondaryWidth = 250;

        return new KTPortlet('kt_page_portlet', {
            sticky: {
                offset: 80,
                zIndex: 90,
                position: {
                    top: function() {
                        var pos = 0;

                        if (KTUtil.isInResponsiveRange('desktop')) {
                            if (KTUtil.hasClass(body, 'kt-subheader--fixed')) {
                                pos = pos + parseInt(KTUtil.css( KTUtil.get('kt_subheader'), 'height') );
                            }
                        } else {
                            if (KTUtil.hasClass(body, 'kt-header-mobile--fixed')) {
                                pos = pos + parseInt(KTUtil.css( KTUtil.get('kt_header_mobile'), 'height') );
                            }
                        }    
                        
                        return pos;                        
                    },
                    left: function(portlet) {
						var porletEl = portlet.getSelf();      
						
						return KTUtil.offset(porletEl).left;
					},
					right: function(portlet) {
						var porletEl = portlet.getSelf();      

						var portletWidth = parseInt(KTUtil.css(porletEl, 'width'));
						var bodyWidth = parseInt(KTUtil.css(KTUtil.get('body'), 'width'));
						var portletOffsetLeft = KTUtil.offset(porletEl).left;
					
						return bodyWidth - portletWidth - portletOffsetLeft;
					}
                }
            }
        });
    }

    return {
        init: function() {
            body = KTUtil.getByTag('body');

            this.initAside();
            this.initScrolltop();
            this.initPageStickyPortlet();

            // Non functional links notice(can be removed in production)
            $('#kt_aside_menu, #kt_header_menu').on('click', '.kt-menu__link[href="#"]:not(.kt-menu__toggle)', function(e) {
                swal("", "You have clicked on a non-functional dummy link!");

                e.preventDefault();
            });
        },

        initAside: function() { 
            initAside();
        },

        initScrolltop: function() { 
            initScrolltop();
        },

        initPageStickyPortlet: function() {
            if (!KTUtil.get('kt_page_portlet')) {
                return;
            }
            
            pageStickyPortlet = initPageStickyPortlet();
            pageStickyPortlet.initSticky();
            
            KTUtil.addResizeHandler(function(){
                pageStickyPortlet.updateSticky();
            });

            initPageStickyPortlet();
        },

        getAsideMenu: function() {
            return asideMenu;
        },

        closeMobileAsideMenuOffcanvas: function() {
            if (KTUtil.isMobileDevice()) {
                asideMenuOffcanvas.hide();
            }
        },

        closeMobileHeaderMenuOffcanvas: function() {
            if (KTUtil.isMobileDevice()) {
                headerMenuOffcanvas.hide();
            }
        }
    };
}();

// webpack support
if (typeof module !== 'undefined') {
    module.exports = KTLayout;
}

// Init on page load completed
KTUtil.ready(function() {
    KTLayout.init();
});