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

resource "google_storage_bucket_object" "content" {
  for_each = fileset("content", "**")
  name   = each.key
  source = "content/${each.key}"
  bucket = google_storage_bucket.marketing_site.name
  cache_control = "max-age=60"
}

resource "google_storage_object_acl" "image-store-acl" {
  for_each = google_storage_bucket_object.content
  object = each.value.output_name
  bucket = google_storage_bucket.marketing_site.name
  role_entity = [
    "READER:allUsers",
  ]
}