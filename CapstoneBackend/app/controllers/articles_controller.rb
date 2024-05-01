class ArticlesController < ApplicationController
  def show
    article = PubmedFetcher.fetch_data
    Rails.logger.debug "Article fetched: #{article.inspect}"
    if article.present?
      render json: article
    else
      render json: { error: 'Article not found' }, status: :not_found
    end
  end

end
