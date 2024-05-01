
module Api
  module V1
    class ArticlesController < ApplicationController
      def show
        article = PubmedFetcher.article_of_the_day
        if article
          render json: article
        else
          render json: { error: 'Article not found' }, status: :not_found
        end
      end
    end
  end
end
