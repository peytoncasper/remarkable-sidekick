resource "google_dns_managed_zone" "sidekick" {
  name        = "remarkablesidekick"
  dns_name    = "remarkablesidekick.com."
  description = "Remarkable Sidekick DNS Zone"
}