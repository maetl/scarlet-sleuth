require "rake/notes/rake_task"
require "yarrow"
require "yarrow/output/context"
require "coffee-script"
require "mustache"
require "webrick"
require "watchr"

task :clean_assets do
  sh "rm -rf _site"
end

task :build_assets => :clean_assets do
  config = {
    :input_dir => "src",
    :output_dir => "_site",
    :append_paths => ["css", "js"]
  }

  pipeline = Yarrow::Assets::Pipeline.new(config)
  #pipeline.environment.css_compressor = :sass
  #pipeline.environment.js_compressor = :uglify
  pipeline.compile(["game.css", "game.js", "vendor.js"])
end

class GameTemplate < Yarrow::Output::Context

  # TODO: replace this
  def config
    config = {
      :input_dir => "src",
      :output_dir => "_site",
      :manifest_path => 'manifest.json', # TODO: remove this setting
      :append_paths => ["css", "js"]
    }
  end

  def js_script_tags
    [script_tag(asset: "vendor.js"), script_tag(asset: "game.js")].join "\n"
  end

  def css_link_tags
    link_tag(asset: "game.css")
  end

end

task :build_html => :build_assets do
  template = File.read("src/tpl/index.tpl")

  context = GameTemplate.new({
    :title => "Scarlet Sleuth"
  })

  output = Mustache.render(template, context)

  File.open("_site/index.html", 'w+:UTF-8') do |file|
    file.puts output
  end
end

task :build_levels do
  map = File.read("src/js/sleuth/levels/estate.txt").split("\n")
  puts map
end

task :serve do
  require 'rack'

  root = File.expand_path(File.join(File.dirname(__FILE__), "_site"))

  app = Rack::Builder.new do
    run Proc.new { |env|
      req = Rack::Request.new(env)
      index_file = File.join(root, req.path_info, "index.html")
 
      if File.exists?(index_file)
        req.path_info += "index.html"
      end

      Rack::Directory.new(root).call(env)
    }
  end

  Signal.trap('INT') {
    Rack::Handler::WEBrick.shutdown
  }

  Rack::Handler::WEBrick.run app
end

task :watch do
  script = Watchr::Script.new
  script.watch('src/**') do
    Rake.application['build_html'].invoke
  end
  watcher = Watchr::Controller.new(script, Watchr.handler.new)
  watcher.run
end

task :default => :build_html
