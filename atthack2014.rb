$:<<::File.dirname(__FILE__)

require 'sinatra/base'
require 'ap'
require 'json'
require 'sinatra/respond_to'
require 'haml'


class Atthack2014 < Sinatra::Base

  enable :sessions

  configure do
    set :views, settings.root + '/app/views'
    set :public_folder, settings.root + '/app/public'
  end

  before do
    # content_type :json
    # if Sinatra::Base.development?
    #   response.headers['Access-Control-Allow-Origin'] = '*'
    #   response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    #   response.headers['Access-Control-Allow-Headers'] = 'X-CSRF-Token' # This is a Rails header, you may not need it
    # end
  end

  # def self.reset
  #   session[:teaser]  = 0
  #   session[:gun]     = 0
  #   session[:down]    = 0
  #   session[:holster] = 0
  # end

  get '/' do
    session[:teaser]  = 0
    session[:gun]     = 0
    session[:down]    = 0
    session[:holster] = 0
    haml :home, :format => :html5
  end

  get '/holster' do
    content_type :json
    {holster: session[:holster]}.to_json
  end

  get '/gun' do
    content_type :json
    {gun: session[:gun]}.to_json
  end

  get '/down' do
    content_type :json
    {down: session[:down]}.to_json
  end

  get '/teaser' do
    content_type :json
    {teaser: session[:teaser]}.to_json
  end

  get '/holster/:status' do
    session[:holster] = params[:status]
    session[:teaser]  = 0
    session[:gun]     = 0
    session[:down]    = 0
    # content_type :json
    # {holster: session[:holster]}.to_json
    status 200
  end

  get '/teaser/:status' do
    session[:teaser] = params[:status]
    session[:gun]     = 0
    session[:down]    = 0
    session[:holster] = 0
    status 200
  end

  get '/gun/:status' do
    session[:gun] = params[:status]
    session[:teaser]  = 0
    session[:down]    = 0
    session[:holster] = 0
    status 200
  end

  get '/down/:status' do
    session[:down] = params[:status]
    session[:teaser]  = 0
    session[:gun]     = 0
    session[:holster] = 0
    status 200
  end

  get '/status' do
    content_type :json
    if session[:holster] == "1"
      status = 1
    elsif session[:teaser] == "1"
      status = 2
    elsif session[:gun] == "1"
      status = 3
    elsif session[:down] == "1"
      status = 4
    else
      status = 0
    end
    {status: status}.to_json
  end

  # start the server if ruby file executed directly
  run! if __FILE__ == $0
end