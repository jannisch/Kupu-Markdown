

document.onreadystatechange = function () {
  var editor = CodeMirror.fromTextArea(document.getElementById("section-editor"), {
    mode: "markdown",
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true
  });
  
  var output = document.getElementById("section-preview");

  editor.on("change", function () {
    output.innerHTML = parse(editor.getValue());
    localStorage.setItem("backup", editor.getValue());
  });

  var demo = new Vue({
    el: 'body',
    data: {
      show_menu: false,
      show_about: false
    },
    methods: {
      menu: function () {
        this.show_menu = !this.show_menu;
      },
      about: function () {
        this.show_about = true;
        this.show_menu = false;
      },
      hide_about: function () {
        this.show_about = false;
      },
      download_md: function () {
        download('markdown.md',editor.getValue());
        this.show_menu = false;
      },
      download_html: function () {
        var doc = HTML_EXPORT_STYLE;
        doc += parse(editor.getValue());
        download('markdown.html',doc);
        this.show_menu = false;
      },
      download_tex: function () {
        var doc = TEX_START;
        doc += parse_tex(editor.getValue());
        doc += TEX_END;
        download('markdown.tex',doc);
        this.show_menu = false;
      },
      download_tex_snippet: function () {
        var doc = "";
        doc += parse_tex(editor.getValue());
        download('markdown_snippet.tex',doc);
        this.show_menu = false;
      }
    }
  })

  var backup = localStorage.getItem("backup");
  if (backup) {
    editor.setValue(backup);
  }
}​
