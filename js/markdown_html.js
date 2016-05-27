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

  for (var i = 0; i < lines.length; i++){
    var line = lines[i].escapeHtml();
    var next_line = "";
    if (i < lines.length - 1){
      next_line = lines[i+1].escapeHtml();
    }
    //bold and italic
    line = line.replaceAll(regex_bold_emph,"<b><i>$1</i></b>");
    line = line.replaceAll(regex_bold,"<b>$1</b>");
    line = line.replaceAll(regex_emph,"<i>$1</i>");
    line = line.replaceAll(regex_inline_code,"<code>$1</code>");

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
    }else if(ordered_list_active){
      output += "<ol>" + "\n";
      ordered_list_active = false;
    }

    //headline 1 ===== style
    if (regex_headline_1s.test(next_line)){
      output += "<h1>" + line + "</h1>" + "\n";
      continue;
    }
    if (regex_headline_1s.test(line)){
      continue;
    }
    //headline 1 ----- style
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
        output += "<pre><code>" + "\n";
        code_active = true;
      }
      output += line.substring(4,line.length) + "\n";
      continue;
    }else if(code_active){
      output += "</code></pre>" + "\n";
      code_active = false;
    }

    //quote
    if (regex_quote.test(line)) {
      output += "<blockquote>" + line.substring(5, line.length) + "</blockquote>" + "\n";
      continue;
    }

    //headline 4
    if (regex_headline_4.test(line)) {
      output += "<h4>" + line.substring(5, line.length) + "</h4>" + "\n";
      continue;
    }
    //headline 3
    if (regex_headline_3.test(line)) {
      output += "<h3>" + line.substring(4, line.length) + "</h3>" + "\n";
      continue;
    }
    //headline 2
    if (regex_headline_2.test(line)) {
      output += "<h2>" + line.substring(3, line.length) + "</h2>" + "\n";
      continue;
    }
    //headline 1
    if (regex_headline_1.test(line)) {
      output += "<h1>" + line.substring(2, line.length) + "</h1>" + "\n";
      continue;
    }

    if (line != "" && line != "\n"){
      output += line + "\n";
    }
  }

  return output;
}
