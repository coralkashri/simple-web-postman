(function($) {
    function initialize_ace() {
        var dom = ace.require("ace/lib/dom");

        //ace.config.set("enableBasicAutocompletion", true);

        //add command to all new editor instances
        ace.require("ace/commands/default_commands").commands.push({
            name: "Toggle Fullscreen",
            bindKey: "F11",
            exec: function(editor) {
                var fullScreen = dom.toggleCssClass(document.body, "fullScreen");
                dom.setCssClass(editor.container, "fullScreen", fullScreen);
                editor.setAutoScrollEditorIntoView(!fullScreen);
                editor.resize();
            }
        });

        var editor = ace.edit("ace-editor");
        editor.setTheme("ace/theme/chrome");
        editor.session.setMode("ace/mode/json");
        editor.session.setOptions({
            tabSize: 2,
            useSoftTabs: true
        });
    }

    function init_materialize() {
        $('select').formSelect();
        let collapsible = $('.collapsible');
        collapsible.collapsible();
        collapsible.filter('.expandable').collapsible({
            accordion: false
        });
        $('.dropdown-trigger').dropdown();
        $('#user_options_dropdown_trigger').dropdown({
            //       width: 140,
            position: "static"
        });
        /*$('#advanced_search_version_modal .tabs').tabs({
            onShow: () => {
                $('#advanced_search_version_modal .tabs').tabs("select", "advanced_search_by_version");
            }
        });*/
    }

    /**
     * Initialize Alertify Properties
     */
    function initialize_alertify_properties() {
        alertify.setPosition(false, 1);
        alertify.setTemplate(function (input) {
            return "<b>" + input + "</b>";
        });
    }

    function init_scroll() {
        if (!document.getElementById("page_sticky_header")) return;
        let header, sticky;
        header = $(".sticky-action");
        //sticky = header.offsetTop;

        function downAction() {
            header.removeClass('open');
            header.removeClass('home');
            header.addClass('collapse');
            $(".dropdown-trigger").dropdown('close');
        }

        function upAction() {
            header.removeClass('collapse');
            header.removeClass('home');
            header.addClass('open');
            header.addClass("sticky");
        }

        function homeAction() {
            header.removeClass('collapse');
            header.addClass('home');
            header.addClass('open');
            header.removeClass("sticky");
        }

        var scrollTop = function() {
            return window.scrollY;
        };
        let scrollState = 0;
        let scrollDetect = function(home, down, up) {
            // Current scroll position
            var currentScroll = scrollTop();
            if (scrollTop() === 0) {
                home();
            } else if (currentScroll > scrollState) {
                down();
            } else {
                up();
            }
            // Set previous scroll position
            scrollState = scrollTop();
        };
        window.onscroll = function () {
            /*if (window.pageYOffset > sticky) {
                header_classes.add("sticky");
            } else {
                header_classes.remove("sticky");
            }*/
            scrollDetect(homeAction, downAction, upAction);
        };
    }

    function scroll_to_top() {
        $("html, body").animate({ scrollTop: $('body').offset().top }, 1000);
    }

    function init_sidenav() {
        let sidenav_instance = $(".sidenav");
        if (sidenav_instance) {
            sidenav_instance.sidenav({
                onOpenStart: function () {
                    $(".dismiss_area").addClass("on");
                },
                draggable: true,
                onCloseEnd: function () {
                    $(".dismiss_area").removeClass("on");
                },
                edge: 'left'
            });
        }
    }

    function init_dismiss_area() {
        $(".dismiss_area").click(function() {
            if ($(this).hasClass("on")) {
                $(".sidenav").sidenav("close");
                $(".dismiss_area").removeClass("on");
            }
        });
    }

    function init_all() {
        initialize_ace();
        init_materialize();
        initialize_alertify_properties();
        init_scroll();
        init_dismiss_area();
        init_sidenav();
    }

    $(document).ready(function(){
        init_all();
    });
})(jQuery);