data "google_service_account" "github_actions" {
  account_id = "github-action"
}

resource "google_storage_bucket" "marketing_site" {
  name          = "remarkablesidekick.com"
  location      = "US"
  force_destroy = true

  uniform_bucket_level_access = false

  website {
    main_page_suffix = "index.html"
  }

  cors {
    origin          = ["https://remarkablesidekick.com"]
    method          = ["GET", "POST"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

resource "google_storage_bucket_access_control" "public_rule" {
  bucket = google_storage_bucket.marketing_site.name
  role   = "READER"
  entity = "allUsers"
}

resource "google_storage_bucket_access_control" "github_action_uploader" {
  bucket = google_storage_bucket.marketing_site.name
  role   = "WRITER"
  entity = "user-${data.google_service_account.github_actions.email}"
}