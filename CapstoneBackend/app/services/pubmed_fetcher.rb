class PubmedFetcher
  include HTTParty
  base_uri 'https://www.ncbi.nlm.nih.gov/research/bionlp/RESTful/pmcoa.cgi'

  def self.fetch_data(article_id = '17299597')
    response = get("/BioC_json/#{article_id}/unicode")
    puts "Debug: Fetch data response - #{response.inspect}"
    response.parsed_response
  end
end
