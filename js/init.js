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

    function init_all() {
        initialize_ace();
    }

    $(document).ready(function(){
        init_all();
    });
})(jQuery);