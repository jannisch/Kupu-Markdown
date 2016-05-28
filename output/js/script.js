function download(e,t){var n=document.createElement("a");n.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(t)),n.setAttribute("download",e),n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n)}function parse(e){for(var t="",n=e.split("\n"),l=!1,r=!1,a=!1,s=!1,i=!1,o=0;o<n.length;o++){var g=n[o].escapeHtml(),_="";o<n.length-1&&(_=n[o+1].escapeHtml()),i=""==g,g=g.replaceAll(regex_bold_emph,"<b><i>$1</i></b>"),g=g.replaceAll(regex_bold,"<b>$1</b>"),g=g.replaceAll(regex_emph,"<i>$1</i>"),g=g.replaceAll(regex_inline_code,"<code>$1</code>"),g=g.replaceAll(regex_hyperlink_ext,"<a href='$4'>$2</a>"),g=g.replaceAll(regex_hyperlink," <a href='$1$2'>$1$2</a> "),g=g.replaceAll(regex_quote,"<blockquote>$1</blockquote>"),g=g.replaceAll(regex_headline_4,"<h4>$1</h4>"),g=g.replaceAll(regex_headline_3,"<h3>$1</h3>"),g=g.replaceAll(regex_headline_2,"<h2>$1</h2>"),g=g.replaceAll(regex_headline_1,"<h1>$1</h1>"),g=g.replaceAll(regex_linebreak,"<br />"),g=g.replaceAll(regex_linebreak_2,"<br />"),regex_sublist.test(g)?(r||(t+="<ul>\n",r=!0),t+="<li>"+g.substring(6,g.length)+"</li>\n"):(r&&(t+="</ul>\n",r=!1),regex_list.test(g)?(l||(t+="<ul>\n",l=!0),t+="<li>"+g.substring(2,g.length)+"</li>\n"):(l&&!r&&(t+="</ul>\n",l=!1),regex_ordered_list.test(g)?(a||(t+="<ol>\n",a=!0),g=g.replace(regex_ol_removal,""),t+="<li>"+g+"</li>\n"):(!a||regex_line_indent.test(g)||i||(t+="</ol>\n",a=!1),regex_headline_1s.test(_)?t+="<h1>"+g+"</h1>\n":regex_headline_1s.test(g)||(regex_headline_2s.test(_)?t+="<h2>"+g+"</h2>\n":regex_headline_2s.test(g)||(regex_code.test(g)?(s||(t+="<pre><code>",s=!0),t+=g.substring(4,g.length)+"\n"):(s&&(t+="</code></pre>\n",s=!1),""!=g&&"\n"!=g&&(t+=g+"\n")))))))}return t}function parse_tex(e){for(var t="",n=e.split("\n"),l=!1,r=!1,a=!1,s=!1,i=0;i<n.length;i++){var o=n[i],g="";i<n.length-1&&(g=n[i+1]),o=o.replaceAll(regex_bold_emph,"\\textbf{\\textit{$1}}"),o=o.replaceAll(regex_bold,"\\textbf{$1}"),o=o.replaceAll(regex_emph,"\\textit{$1}"),o=o.replaceAll(regex_inline_code,"\\begin{lstlisting}\n$1\n\\end{lstlisting}"),regex_code.test(o)?(s||(t+="\\begin{lstlisting}\n",s=!0),t+=o.substring(4,o.length)+"\n"):(s&&(t+="\\end{lstlisting}\n",s=!1),regex_sublist.test(o)?(r||(t+="\\begin{itemize}\n",r=!0),t+="\\item "+o.substring(6,o.length)+"\n"):(r&&(t+="\\end{itemize}\n",r=!1),regex_list.test(o)?(l||(t+="\\begin{itemize}\n",l=!0),t+="\\item "+o.substring(2,o.length)+"\n"):(l&&!r&&(t+="\\end{itemize}\n",l=!1),regex_ordered_list.test(o)?(a||(t+="\\begin{enumerate}\n",a=!0),o=o.replace(regex_ol_removal,""),t+="\\item "+o+"\n"):(a&&(t+="\\end{enumerate}\n",a=!1),regex_headline_1s.test(g)?t+="\\section{"+o+"}\n":regex_headline_1s.test(o)||(regex_headline_2s.test(g)?t+="\\subsection{"+o+"}\n":regex_headline_2s.test(o)||(regex_quote_tex.test(o)?t+="\\noindent "+o.substring(2,o.length)+"\n":regex_headline_4.test(o)?t+="\\subsection{"+o.substring(5,o.length)+"}\n":regex_headline_3.test(o)?t+="\\subsection{"+o.substring(4,o.length)+"}\n":regex_headline_2.test(o)?t+="\\subsection{"+o.substring(3,o.length)+"}\n":regex_headline_1.test(o)?t+="\\section{"+o.substring(2,o.length)+"}\n":""!=o&&"\n"!=o&&(t+=o+"\n")))))))}return t}String.prototype.replaceAll=function(e,t){var n=this;return n.replace(new RegExp(e),t)},String.prototype.escapeHtml=function(){var e=this;return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")};var regex_emph=/[\_\*](.*)[\_\*]/,regex_bold=/[\_\*]{2}(.*)[\_\*]{2}/,regex_bold_emph=/[\_\*]{3}(.*)[\_\*]{3}/,regex_headline_1=/^#\s(.*)$/,regex_headline_2=/^#{2}\s(.*)$/,regex_headline_3=/^#{3}\s(.*)$/,regex_headline_4=/^#{4}\s(.*)$/,regex_list=/^\*\s.*$/,regex_sublist=/^\s{4}\*\s.*$/,regex_headline_1s=/^={2,}$/,regex_headline_2s=/^-{2,}$/,regex_ordered_list=/^\d{1,4}\.\s.*$/,regex_ol_removal=/^\d{1,4}\.\s/,regex_code=/^\s{4}.*$/,regex_inline_code=/`(.*)`/,regex_quote=/^&gt;\s(.*)$/,regex_quote_tex=/^>\s.*$/,regex_hyperlink=/[\s\n](http\:\/\/)?([\w\d\-\_]*\.[\w\d\-\_]*\.\w{2,7}.*)[\s\n]/,regex_hyperlink_ext=/(\[(.*)\])\((http\:\/\/)?([\w\d\-\_]*\.[\w\d\-\_]*\.\w{2,7}.*)(\s.*)?\)/,regex_linebreak=/\s{2,}$/,regex_linebreak_2=/^$/,regex_line_indent=/^\s{2,}.*$/;HTML_EXPORT_STYLE="<style>body {padding 10px; font-family: sans-serif;} code {background-color: #ddd}</style>",TEX_START=" \\documentclass{article} \\usepackage{fancyhdr} \\usepackage{graphicx} \\usepackage{ngerman} \\usepackage{geometry} \\usepackage[latin1]{inputenc} \\usepackage[T1]{fontenc} \\usepackage{amsmath} \\usepackage{microtype} \\usepackage{booktabs} \\usepackage{amssymb} \\usepackage{amsthm} \\usepackage{framed} \\usepackage{color} \\usepackage{tikz} \\usepackage{pgfplots} \\usetikzlibrary{mindmap} \\geometry{   left=3cm,   right=3cm,   top=3cm,   bottom=4cm,   bindingoffset=5mm } \\pagestyle{fancy} \\pagenumbering{gobble} \\title{Your-title} \\author{Your-name} \\date{\\today} \\fancyhf{} \\fancyhead[L]{\\textbf{Your-name}} \\fancyhead[R]{\\textbf{\\today}} \\begin{document}",TEX_END="\\end{document}",document.onreadystatechange=function(){var e=CodeMirror.fromTextArea(document.getElementById("section-editor"),{mode:"markdown",lineNumbers:!0,styleActiveLine:!0,matchBrackets:!0}),t=document.getElementById("section-preview");e.on("change",function(){t.innerHTML=parse(e.getValue()),localStorage.setItem("backup",e.getValue())});var n=(new Vue({el:"body",data:{show_menu:!1,show_about:!1},methods:{menu:function(){this.show_menu=!this.show_menu},about:function(){this.show_about=!0,this.show_menu=!1},hide_about:function(){this.show_about=!1},download_md:function(){download("markdown.md",e.getValue()),this.show_menu=!1},download_html:function(){var t=HTML_EXPORT_STYLE;t+=parse(e.getValue()),download("markdown.html",t),this.show_menu=!1},download_tex:function(){var t=TEX_START;t+=parse_tex(e.getValue()),t+=TEX_END,download("markdown.tex",t),this.show_menu=!1},download_tex_snippet:function(){var t="";t+=parse_tex(e.getValue()),download("markdown_snippet.tex",t),this.show_menu=!1},print:function(){window.print(),this.show_menu=!1}}}),localStorage.getItem("backup"));n&&e.setValue(n)};