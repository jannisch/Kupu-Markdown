require 'slim'
require 'sass'
require 'net/http'

sass_options = {
  cache: true,
  syntax: :sass,
  style: :compressed
}

#Copy static resources
FileUtils.copy_file("extern/css/codemirror.css","output/css/codemirror.css")
FileUtils.copy_file("extern/js/vue.min.js","output/js/vue.min.js")
FileUtils.copy_file("extern/js/codemirror.js","output/js/codemirror.js")

#Render Sass
File.write('output/css/style.css', Sass::Engine.new(File.read('sass/style.sass'), sass_options).render)
File.write('output/css/render_style.css', Sass::Engine.new(File.read('sass/render_style.sass'), sass_options).render)

#Render Slim
File.write('output/index.html', Slim::Template.new{File.read('slim/index.slim')}.render)

#Merge JS
script = File.read("js/helper.js")+
  File.read("js/markdown.js")+
  File.read("js/markdown_html.js")+
  File.read("js/markdown_tex.js")+
  File.read("js/ui.js")

# Minify and save JS
uri = URI('https://marijnhaverbeke.nl/uglifyjs')
minified = Net::HTTP.post_form(uri, 'js_code' => script).body
File.write('output/js/script.js', minified)

#Clean JS
#File.write('output/js/script.js', script)
