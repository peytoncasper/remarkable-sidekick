data "google_service_account" "github_actions" {
  account_id = "github-action"
}

resource "google_storage_bucket" "marketing_site" {
  name          = "remarkablesidekick.com"
  location      = "US"
  force_destroy = true

  uniform_bucket_level_access = false

  website {
    main_page_suffix = "market-page/index.html"
  }

  cors {
    origin          = ["https://remarkablesidekick.com"]
    method          = ["GET", "POST"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

resource "google_storage_bucket_object" "index_html" {
  name   = "index.html"
  source = "index.html"
  bucket = google_storage_bucket.marketing_site.name
}

resource "google_storage_object_access_control" "index_html" {
  object = google_storage_bucket_object.index_html.output_name
  bucket = google_storage_bucket.marketing_site.name
  role   = "READER"
  entity = "allUsers"
}