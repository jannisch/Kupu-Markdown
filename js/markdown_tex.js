
TEX_START = " \
\\documentclass{article} \
\\usepackage{fancyhdr} \
\\usepackage{graphicx} \
\\usepackage{ngerman} \
\\usepackage{geometry} \
\\usepackage[latin1]{inputenc} \
\\usepackage[T1]{fontenc} \
\\usepackage{amsmath} \
\\usepackage{microtype} \
\\usepackage{booktabs} \
\\usepackage{amssymb} \
\\usepackage{amsthm} \
\\usepackage{framed} \
\\usepackage{color} \
\\usepackage{tikz} \
\\usepackage{pgfplots} \
\\usetikzlibrary{mindmap} \
\\geometry{ \
  left=3cm, \
  right=3cm, \
  top=3cm, \
  bottom=4cm, \
  bindingoffset=5mm \
} \
\\pagestyle{fancy} \
\\pagenumbering{gobble} \
\\title{Your-title} \
\\author{Your-name} \
\\date{\\today} \
\\fancyhf{} \
\\fancyhead[L]{\\textbf{Your-name}} \
\\fancyhead[R]{\\textbf{\\today}} \
\\begin{document}";
TEX_END = '\\end{document}';

function parse_tex(md){
  var output = "";
  var lines = md.split("\n");
  var newline=""

  //states
  var list_active = false;
  var sub_list_active = false;
  var ordered_list_active = false;
  var code_active = false;

  for (var i = 0; i < lines.length; i++){
    var line = lines[i];
    var next_line = "";
    if (i < lines.length - 1){
      next_line = lines[i+1];
    }
    //bold and italic
    line = line.replaceAll(regex_bold_emph,'\\textbf{\\textit{$1}}');
    line = line.replaceAll(regex_bold,'\\textbf{$1}');
    line = line.replaceAll(regex_emph,'\\textit{$1}');
    line = line.replaceAll(regex_inline_code,'\\begin{lstlisting}'+"\n"+'$1'+"\n"+'\\end{lstlisting}');

    //code
    if (regex_code.test(line)) {
      if (!code_active){
        output += '\\begin{lstlisting}' + "\n";
        code_active = true;
      }
      output += line.substring(4,line.length) + "\n";
      continue;
    }else if(code_active){
      output += '\\end{lstlisting}' + "\n";
      code_active = false;
    }

    //sub-list
    if (regex_sublist.test(line)) {
      if (!sub_list_active){
        output += '\\begin{itemize}' + "\n";
        sub_list_active = true;
      }
      output += '\\item ' + line.substring(6, line.length) + "\n";
      continue;
    }else if(sub_list_active){
      output += '\\end{itemize}' + "\n";
      sub_list_active = false;
    }

    //list
    if (regex_list.test(line)) {
      if (!list_active){
        output += '\\begin{itemize}' + "\n";
        list_active = true;
      }
      output += '\\item ' + line.substring(2, line.length) + "\n";
      continue;
    }else if(list_active && !sub_list_active){
      output += '\\end{itemize}' + "\n";
      list_active = false;
    }

    //ordered list
    if (regex_ordered_list.test(line)) {
      if (!ordered_list_active){
        output += '\\begin{enumerate}' + "\n";
        ordered_list_active = true;
      }
      line = line.replace(regex_ol_removal,"");
      output += '\\item ' + line + "\n";
      continue;
    }else if(ordered_list_active){
      output += '\\end{enumerate}' + "\n";
      ordered_list_active = false;
    }

    //headline 1 ===== style
    if (regex_headline_1s.test(next_line)){
      output += '\\section{' + line + '}' + "\n";
      continue;
    }
    if (regex_headline_1s.test(line)){
      continue;
    }
    //headline 1 ----- style
    if (regex_headline_2s.test(next_line)){
      output += '\\subsection{' + line + '}' + "\n";
      continue;
    }
    if (regex_headline_2s.test(line)){
      continue;
    }

    //quote
    if (regex_quote_tex.test(line)) {
      output += '\\noindent ' + line.substring(2, line.length) + "\n";
      continue;
    }

    //headline 4
    if (regex_headline_4.test(line)) {
      output += '\\subsection{' + line.substring(5, line.length) + '}' + "\n";
      continue;
    }
    //headline 3
    if (regex_headline_3.test(line)) {
      output += '\\subsection{' + line.substring(4, line.length) + '}' + "\n";
      continue;
    }
    //headline 2
    if (regex_headline_2.test(line)) {
      output += '\\subsection{' + line.substring(3, line.length) + '}' + "\n";
      continue;
    }
    //headline 1
    if (regex_headline_1.test(line)) {
      output += '\\section{' + line.substring(2, line.length) + '}' + "\n";
      continue;
    }

    if (line != "" && line != "\n"){
      output += line + "\n";
    }
  }

  return output;
}
