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
    @@holster = 0
    @@taser = 0
    @@gun = 0
    @@down = 0
  end

  before do
    # content_type :json
    # if Sinatra::Base.development?
    #   response.headers['Access-Control-Allow-Origin'] = '*'
    #   response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    #   response.headers['Access-Control-Allow-Headers'] = 'X-CSRF-Token' # This is a Rails header, you may not need it
    # end
  end

  get '/reset' do
    @@taser   = 0
    @@gun     = 0
    @@down    = 0
    @@holster = 0
    status 200
  end

  get '/' do
    haml :home, :format => :html5
  end

  get '/holster' do
    content_type :json
    {holster: @@holster}.to_json
  end

  get '/gun' do
    content_type :json
    {gun: @@gun}.to_json
  end

  get '/down' do
    content_type :json
    {down: @@down}.to_json
  end

  get '/taser' do
    content_type :json
    {taser: @@taser}.to_json
  end

  post '/holster/:status' do
    @@holster = params[:status]
    @@taser   = 0
    @@gun     = 0
    @@down    = 0
    content_type :json
    {holster: @@holster}.to_json
  end

  post '/taser/:status' do
    @@taser = params[:status]
    @@gun     = 0
    @@down    = 0
    @@holster = 0
    content_type :json
    {taser: @@taser}.to_json
  end

  post '/gun/:status' do
    @@gun     = params[:status]
    @@taser   = 0
    @@down    = 0
    @@holster = 0
    content_type :json
    {gun: @@gun}.to_json
  end

  post '/down/:status' do
    @@down    = params[:status]
    @@taser   = 0
    @@gun     = 0
    @@holster = 0
    content_type :json
    {down: @@down}.to_json
  end

  get '/status' do
    content_type :json
    if @@holster == "1"
      status = 1
    elsif @@taser == "1"
      status = 2
    elsif @@gun == "1"
      status = 3
    elsif @@down == "1"
      status = 4
    else
      status = 0
    end
    {status: status}.to_json
  end

  # start the server if ruby file executed directly
  run! if __FILE__ == $0
end