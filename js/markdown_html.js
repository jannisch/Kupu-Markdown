HTML_EXPORT_STYLE = "<style>body {padding 10px; font-family: sans-serif;} code {background-color: #ddd}</style>";

function parse(md){
  var output = "";
  var lines = md.split("\n");
  var newline=""


  //states
  var list_active = false;
  var sub_list_active = false;
  var ordered_list_active = false;
  var code_active = false;

  var empty_line = false;

  for (var i = 0; i < lines.length; i++){
    var line = lines[i].escapeHtml();
    var next_line = "";
    if (i < lines.length - 1){
      next_line = lines[i+1].escapeHtml();
    }

    empty_line = (line =="");

    //bold and italic
    line = line.replaceAll(regex_bold_emph,"<b><i>$1</i></b>");
    line = line.replaceAll(regex_bold,"<b>$1</b>");
    line = line.replaceAll(regex_emph,"<i>$1</i>");
    line = line.replaceAll(regex_inline_code,"<code>$1</code>");

    //advanced hyperlink
    line = line.replaceAll(regex_hyperlink_ext,"<a href='$4'>$2</a>");

    //simple hyperlink
    line = line.replaceAll(regex_hyperlink," <a href='$1$2'>$1$2</a> ");

    //quote
    line = line.replaceAll(regex_quote,"<blockquote>$1</blockquote>");

    //Headlines
    line = line.replaceAll(regex_headline_4,"<h4>$1</h4>");
    line = line.replaceAll(regex_headline_3,"<h3>$1</h3>");
    line = line.replaceAll(regex_headline_2,"<h2>$1</h2>");
    line = line.replaceAll(regex_headline_1,"<h1>$1</h1>");

    //New line
    line = line.replaceAll(regex_linebreak,"<br />");
    line = line.replaceAll(regex_linebreak_2,"<br />");

    //sub-list
    if (regex_sublist.test(line)) {
      if (!sub_list_active){
        output += "<ul>" + "\n";
        sub_list_active = true;
      }
      output += "<li>" + line.substring(6, line.length) + "</li>" + "\n";
      continue;
    }else if(sub_list_active){
      output += "</ul>" + "\n";
      sub_list_active = false;
    }

    //list
    if (regex_list.test(line)) {
      if (!list_active){
        output += "<ul>" + "\n";
        list_active = true;
      }
      output += "<li>" + line.substring(2, line.length) + "</li>" + "\n";
      continue;
    }else if(list_active && !sub_list_active){
      output += "</ul>" + "\n";
      list_active = false;
    }

    //ordered list
    if (regex_ordered_list.test(line)) {
      if (!ordered_list_active){
        output += "<ol>" + "\n";
        ordered_list_active = true;
      }
      line = line.replace(regex_ol_removal,"");
      output += "<li>" + line + "</li>" + "\n";
      continue;
    }else if(ordered_list_active && !regex_line_indent.test(line) && !empty_line){
      output += "</ol>" + "\n";
      ordered_list_active = false;
    }

    //Headlines (------ style)
    if (regex_headline_1s.test(next_line)){
      output += "<h1>" + line + "</h1>" + "\n";
      continue;
    }
    if (regex_headline_1s.test(line)){
      continue;
    }
    if (regex_headline_2s.test(next_line)){
      output += "<h2>" + line + "</h2>" + "\n";
      continue;
    }
    if (regex_headline_2s.test(line)){
      continue;
    }

    //code
    if (regex_code.test(line)) {
      if (!code_active){
        output += "<pre><code>";
        code_active = true;
      }
      output += line.substring(4,line.length) + "\n";
      continue;
    }else if(code_active){
      output += "</code></pre>" + "\n";
      code_active = false;
    }



    if (line != "" && line != "\n"){
      output += line + "\n";
    }
  }

  return output;
}
