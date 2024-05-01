require "active_support/core_ext/integer/time"

Rails.application.configure do
  config.cache_classes = true
  config.eager_load = true
  config.consider_all_requests_local = false
  config.action_controller.perform_caching = true
  config.require_master_key = true
  config.public_file_server.enabled = false
  config.assets.js_compressor = :uglifier
  config.assets.compile = false
  config.force_ssl = true
  config.log_level = :info
  config.log_tags = [ :request_id ]
  config.logger = ActiveSupport::Logger.new(STDOUT)
  config.logger.formatter = ::Logger::Formatter.new
  config.log_formatter = ::Logger::Formatter.new
  config.action_mailer.perform_caching = false
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.default_url_options = { host: 'Jack-Bidwell-2024-Capstone.onrender.com', protocol: 'https' }
  config.i18n.fallbacks = true
  config.active_support.deprecation = :notify
  config.log_formatter = ::Logger::Formatter.new
  config.active_record.dump_schema_after_migration = false
end
