require 'faraday'
require 'faraday_middleware'
require 'npr'

def getNPR(country)

  NPR.configure do |config|
    config.apiKey         = ENV['NPR_API_KEY']
    config.sort           = "date descending"
    config.requiredAssets = "text"
  end

  client = NPR::API::Client.new(apiKey: NPR.config.apiKey)
  response = client.query(searchTerm: country, numResults: "5")
  
  @stories = []

  response.list.stories.each do |story|
    @stories << {title: story.title, link: story.links.first.content}
  end

  puts @stories

  @stories.to_json
end