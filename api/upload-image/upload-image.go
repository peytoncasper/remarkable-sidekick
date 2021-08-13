// Package p contains an HTTP Cloud Function.
package p

import (
	"cloud.google.com/go/storage"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"html"
	"log"
	"net/http"
)

func UploadImageToBucket(w http.ResponseWriter, r *http.Request) {
	var image struct {
		Name string `json:"name"`
		Data string `json:"data"`
	}

	if err := json.NewDecoder(r.Body).Decode(&image); err != nil {
		switch err {
		default:
			log.Printf("error decoding image object %v", err)
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			return
		}
	}

	decodedImage, err := base64.StdEncoding.DecodeString(image.Data)
	if err != nil {
		log.Printf("error decoding image %v", err)
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	client, err := storage.NewClient(ctx)
	if err != nil {
		log.Printf("error creating gcs client %v", err)
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	bkt := client.Bucket("remarkable-sidekick-images")

	obj := bkt.Object(image.Name)
	objWriter := obj.NewWriter(context.Background())

	if _, err := fmt.Fprintf(objWriter, string(decodedImage)); err != nil {
		log.Printf("error writing image to bucket %v", err)
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}
	// Close, just like writing a file.
	if err := objWriter.Close(); err != nil {
		log.Printf("error closing image writer %v", err)
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	fmt.Fprint(w, html.EscapeString("image saved to bucket"))
}
