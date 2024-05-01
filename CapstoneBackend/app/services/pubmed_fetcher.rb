
class PubmedFetcher
  include HTTParty
  base_uri 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/'

  def self.article_of_the_day

    params = {
      db: 'pubmed',
      term: 'sports medicine',
      retmax: 10,
      usehistory: 'y',
      api_key: ENV['PUBMED_API_KEY']
    }
    search_response = get('/esearch.fcgi', query: params)
    search_result = search_response.parsed_response


    fetch_params = {
      db: 'pubmed',
      retmode: 'json',
      id: search_result["esearchresult"]["idlist"].first
    }
    detail_response = get('/efetch.fcgi', query: fetch_params)
    detail_response.parsed_response
  end
end
