resource "google_compute_global_address" "sidekick" {
  name = "remarkable-sidekick-ip"
}

resource "google_compute_managed_ssl_certificate" "sidekick" {
  name = "remarkable-sidekick-cert"

  managed {
    domains = ["remarkablesidekick.com."]
  }
}

resource "google_dns_managed_zone" "sidekick" {
  name        = "remarkablesidekick"
  dns_name    = "remarkablesidekick.com."
  description = "Remarkable Sidekick DNS Zone"
}

resource "google_dns_record_set" "remarkablesidekick_com" {
  name = "remarkablesidekick.com."
  type = "A"
  ttl  = 60

  managed_zone = google_dns_managed_zone.sidekick.name
  rrdatas = [ google_compute_global_address.sidekick.address ]
}

resource "google_compute_backend_bucket" "marketing_site" {
  name        = "marketing-site-bucket"
  description = "Contains the marketing site assets"
  bucket_name = "remarkablesidekick.com"
  enable_cdn  = true
}

resource "google_compute_url_map" "marketing_site_https" {
  name        = "marketing-site-https-url-map"
  description = "URL Map for the Remarkable Sidekick Marketing Page"

  default_service = google_compute_backend_bucket.marketing_site.id

  # host_rule {
  #   hosts        = ["remarkablesidekick.com"]
  #   path_matcher = "marketingsite"
  # }

  # path_matcher {
  #   name            = "marketingsite"
  #   default_service = google_compute_backend_bucket.marketing_site.id

  #   path_rule {
  #     paths   = ["/*"]
  #     service = google_compute_backend_bucket.marketing_site.id
  #   }
  # }
}

resource "google_compute_url_map" "marketing_site_http" {
  name        = "marketing-site-http-url-map"
  description = "URL Map for the Remarkable Sidekick Marketing Page"

  default_url_redirect {
    https_redirect = true
    strip_query    = false
  }
}

resource "google_compute_target_https_proxy" "marketing_site" {
  name             = "marketing-site-https-proxy"
  url_map          = google_compute_url_map.marketing_site_https.id
  ssl_certificates = [google_compute_managed_ssl_certificate.sidekick.id]
}

resource "google_compute_target_http_proxy" "marketing_site" {
  name             = "marketing-site-http-proxy"
  url_map          = google_compute_url_map.marketing_site_http.id
}

resource "google_compute_global_forwarding_rule" "marketing_site_https" {
  name       = "marketing-site-https-rule"
  target     = google_compute_target_https_proxy.marketing_site.id
  port_range = "443"
  ip_address = google_compute_global_address.sidekick.address
}

resource "google_compute_global_forwarding_rule" "marketing_site_http" {
  name       = "marketing-site-http-rule"
  target     = google_compute_target_http_proxy.marketing_site.id
  port_range = "80"
  ip_address = google_compute_global_address.sidekick.address
}