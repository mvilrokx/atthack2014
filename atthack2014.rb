$:<<::File.dirname(__FILE__)

require 'sinatra/base'
require 'ap'
require 'json'
require 'sinatra/respond_to'
require 'haml'


class Atthack2014 < Sinatra::Base

  # enable :sessions

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

  get '/' do
    haml :home, :format => :html5
  end

  get '/status' do
    content_type :json
    {status: 1}.to_json
  end

  # start the server if ruby file executed directly
  run! if __FILE__ == $0
end