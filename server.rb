require 'sinatra'
require './getNPR.rb'

set :bind, '0.0.0.0'

get '/' do
  erb :index
end

get '/search/:country' do
  getNPR(params[:country])
end