require 'sinatra'
require 'faraday'
require 'faraday_middleware'
require 'npr'
require 'pry-byebug'

set :bind, '0.0.0.0'

get '/' do
  erb :index
end

get '/search/:country' do

  NPR.configure do |config|
    config.apiKey         = ENV['NPR_API_KEY']
    config.sort           = "date descending"
    config.requiredAssets = "text"
  end


  # NPR::Story.where(searchTerm: "#{params[:country]}").order("date ascending").limit(5)
  client = NPR::API::Client.new(apiKey: NPR.config.apiKey)
  response = client.query(searchTerm: "#{params[:country]}", numResults: "5")
  
  @stories = []

  response.list.stories.each do |story|
    @stories << {title: story.title, link: story.links.first.content}
  end

  p @stories.to_json
  content_type :json
  @stories.to_json
end
